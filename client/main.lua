
local QBCore = exports['qb-core']:GetCoreObject()
local MDTOpen = false
local callsign = nil

-- Notification function that uses ox_lib if enabled
local function Notify(message, type)
    if Config.UseOxLib then
        exports['ox_lib']:notify({
            title = 'Police MDT',
            description = message,
            type = type or 'inform'
        })
    else
        QBCore.Functions.Notify(message, type)
    end
end

-- Base functions
function OpenMDT()
    if MDTOpen then return end
    
    -- Check if player has the required job
    local PlayerData = QBCore.Functions.GetPlayerData()
    if PlayerData.job.name ~= Config.RequireJobName then
        Notify(Lang:t('error.not_authorized'), 'error')
        return
    end

    -- Set callsign if enabled and not already set
    if Config.EnableCallsign and not callsign then
        callsign = PlayerData.metadata.callsign
        if not callsign or callsign == '' then
            Notify(Lang:t('error.no_callsign'), 'error')
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
    Notify(Lang:t('info.mdt_opened'), 'primary')
end

function CloseMDT()
    if not MDTOpen then return end
    
    MDTOpen = false
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = "close"
    })
    Notify(Lang:t('info.mdt_closed'), 'primary')
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
        Notify(Lang:t('success.logged_in'), 'success')
    end
    cb({ success = true })
end)

RegisterNUICallback('changeStatus', function(data, cb)
    -- Handle status change
    if data.status then
        TriggerServerEvent("police:server:UpdateStatus", data.status)
        Notify(Lang:t('success.status_changed', {status = data.status}), 'success')
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

-- ANPR Functionality (if enabled)
local lastScannedPlate = nil

function ScanVehicleAhead()
    if not Config.EnableANPR then return end
    
    local playerPed = PlayerPedId()
    local playerCoords = GetEntityCoords(playerPed)
    local forward = GetEntityForwardVector(playerPed)
    local forwardCoords = vector3(
        playerCoords.x + forward.x * Config.ANPRScanDistance,
        playerCoords.y + forward.y * Config.ANPRScanDistance,
        playerCoords.z
    )
    
    local rayHandle = StartShapeTestRay(playerCoords.x, playerCoords.y, playerCoords.z, 
                                        forwardCoords.x, forwardCoords.y, forwardCoords.z,
                                        10, playerPed, 0)
    local _, _, _, _, vehicle = GetShapeTestResult(rayHandle)
    
    if DoesEntityExist(vehicle) and IsEntityAVehicle(vehicle) then
        local plate = GetVehicleNumberPlateText(vehicle)
        if plate ~= lastScannedPlate then
            lastScannedPlate = plate
            TriggerServerEvent('mdt:server:ANPRScan', plate)
        end
    end
end

-- Only register ANPR command if enabled
if Config.EnableANPR then
    RegisterCommand('anpr', function()
        ScanVehicleAhead()
    end, false)
    
    -- Register keybinding for ANPR
    RegisterKeyMapping('anpr', 'Scan vehicle with ANPR', 'keyboard', 'Y')
end

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

RegisterNetEvent('mdt:client:ANPRResults', function(results)
    if results and results.owner then
        Notify('ANPR: ' .. results.plate .. ' - Owner: ' .. results.owner, 'success')
    end
end)

-- Close MDT on resource stop to prevent stuck NUI
AddEventHandler('onResourceStop', function(resource)
    if resource == GetCurrentResourceName() and MDTOpen then
        CloseMDT()
    end
end)
