
local QBCore = exports['qb-core']:GetCoreObject()
local MDTOpen = false
local callsign = nil

-- Base functions
function OpenMDT()
    if MDTOpen then return end
    
    -- Check if player has the required job
    local PlayerData = QBCore.Functions.GetPlayerData()
    if PlayerData.job.name ~= Config.RequireJobName then
        QBCore.Functions.Notify(Lang:t('error.not_authorized'), 'error')
        return
    end

    -- Set callsign if enabled and not already set
    if Config.EnableCallsign and not callsign then
        callsign = PlayerData.metadata.callsign
        if not callsign or callsign == '' then
            QBCore.Functions.Notify(Lang:t('error.no_callsign'), 'error')
            return
        end
    end

    -- Trigger NUI open
    MDTOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        type = "open",
        callsign = callsign
    })
    QBCore.Functions.Notify(Lang:t('info.mdt_opened'), 'primary')
end

function CloseMDT()
    if not MDTOpen then return end
    
    MDTOpen = false
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = "close"
    })
    QBCore.Functions.Notify(Lang:t('info.mdt_closed'), 'primary')
end

-- Register Command
RegisterCommand(Config.OpenCommand, function()
    if not MDTOpen then
        OpenMDT()
    else
        CloseMDT()
    end
end, false)

-- Register keybinding if configured
if Config.OpenKey and Config.OpenKey ~= '' then
    RegisterKeyMapping(Config.OpenCommand, 'Open Police MDT', 'keyboard', Config.OpenKey)
end

-- NUI Callbacks
RegisterNUICallback('closeApp', function(_, cb)
    CloseMDT()
    cb('ok')
end)

RegisterNUICallback('login', function(data, cb)
    -- Handle login callback
    if data.callsign then
        callsign = data.callsign
        QBCore.Functions.Notify(Lang:t('success.logged_in'), 'success')
    end
    cb({ success = true })
end)

RegisterNUICallback('changeStatus', function(data, cb)
    -- Handle status change
    if data.status then
        TriggerServerEvent("police:server:UpdateStatus", data.status)
        QBCore.Functions.Notify(Lang:t('success.status_changed', {status = data.status}), 'success')
    end
    cb('ok')
end)

RegisterNUICallback('duress', function(_, cb)
    -- Handle duress signal
    local coords = GetEntityCoords(PlayerPedId())
    TriggerServerEvent("police:server:DuressSignal", coords)
    cb('ok')
end)

RegisterNUICallback('flagStolen', function(_, cb)
    -- Handle flagging police vehicle as stolen
    local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
    if vehicle ~= 0 then
        local plate = GetVehicleNumberPlateText(vehicle)
        TriggerServerEvent("police:server:FlagVehicleStolen", plate)
    end
    cb('ok')
end)

-- Event Handlers
RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
    -- Reset variables when player loads
    MDTOpen = false
    callsign = QBCore.Functions.GetPlayerData().metadata.callsign
end)

RegisterNetEvent('QBCore:Client:OnPlayerUnload', function()
    -- Reset variables when player unloads
    MDTOpen = false
    callsign = nil
end)

-- Close MDT on resource stop to prevent stuck NUI
AddEventHandler('onResourceStop', function(resource)
    if resource == GetCurrentResourceName() and MDTOpen then
        CloseMDT()
    end
end)
