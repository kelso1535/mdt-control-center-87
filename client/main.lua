
local Config = require 'config'
local MDTOpen = false

-- Create a standalone callback system
local ClientCallbacks = {}

function TriggerServerCallback(name, cb, ...)
    ClientCallbacks[name] = cb
    TriggerServerEvent('mdt:server:TriggerCallback', name, ...)
end

RegisterNetEvent('mdt:client:TriggerCallback')
AddEventHandler('mdt:client:TriggerCallback', function(name, ...)
    if ClientCallbacks[name] then
        ClientCallbacks[name](...)
        ClientCallbacks[name] = nil
    end
end)

-- Standalone notification system
RegisterNetEvent('mdt:client:Notify')
AddEventHandler('mdt:client:Notify', function(message, type)
    -- Basic notification if ox_lib is not available
    SetNotificationTextEntry('STRING')
    AddTextComponentString(message)
    DrawNotification(false, false)
end)

-- Notification function that uses ox_lib if enabled
local function Notify(message, type)
    if Config.UseOxLib then
        exports['ox_lib']:notify({
            title = 'Police MDT',
            description = message,
            type = type or 'inform'
        })
    else
        TriggerEvent('mdt:client:Notify', message, type)
    end
end

-- Base functions
function OpenMDT()
    if MDTOpen then return end
    
    -- Removed callsign requirement - the MDT login screen will handle authentication

    -- Trigger NUI open
    MDTOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        type = "open"
    })
    Notify('MDT opened', 'primary')
end

function CloseMDT()
    if not MDTOpen then return end
    
    MDTOpen = false
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = "close"
    })
    Notify('MDT closed', 'primary')
end

-- Register MDT Command
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
        TriggerServerEvent('mdt:server:SetCallsign', data.callsign)
        Notify('Logged in as: ' .. data.callsign, 'success')
    end
    cb({ success = true })
end)

RegisterNUICallback('changeStatus', function(data, cb)
    -- Handle status change
    if data.status then
        TriggerServerEvent("police:server:UpdateStatus", data.status)
        Notify('Status changed to: ' .. data.status, 'success')
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
            Notify('ANPR: Scanning plate ' .. plate, 'inform')
        end
    else
        Notify('ANPR: No vehicle detected', 'error')
    end
end

-- Manual ANPR scan with PageDown key
RegisterCommand('manual_anpr', function()
    ScanVehicleAhead()
end, false)

RegisterKeyMapping('manual_anpr', 'Manual ANPR Scan', 'keyboard', 'PAGEDOWN')

-- Only register ANPR command if enabled
if Config.EnableANPR then
    RegisterCommand('anpr', function()
        ScanVehicleAhead()
    end, false)
    
    -- Register keybinding for ANPR
    RegisterKeyMapping('anpr', 'Scan vehicle with ANPR', 'keyboard', 'Y')
end

-- NUI Callbacks for Search History
RegisterNUICallback('getSearchHistory', function(_, cb)
    TriggerServerCallback('mdt:server:GetSearchHistory', function(history)
        cb(history)
    end)
end)

-- Court case management callbacks
RegisterNUICallback('createCourtCase', function(data, cb)
    TriggerServerCallback('mdt:server:CreateCourtCase', function(result)
        cb(result)
    end, data)
end)

RegisterNUICallback('getCourtCases', function(_, cb)
    TriggerServerCallback('mdt:server:GetCourtCases', function(cases)
        cb(cases)
    end)
end)

RegisterNUICallback('updateCourtCase', function(data, cb)
    TriggerServerCallback('mdt:server:UpdateCourtCase', function(result)
        cb(result)
    end, data)
end)

RegisterNUICallback('addMagistrateAvailability', function(data, cb)
    TriggerServerCallback('mdt:server:AddMagistrateAvailability', function(result)
        cb(result)
    end, data)
end)

RegisterNUICallback('getMagistrateAvailability', function(_, cb)
    TriggerServerCallback('mdt:server:GetMagistrateAvailability', function(availability)
        cb(availability)
    end)
end)

-- Event Handlers
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
