
local QBCore = exports['qb-core']:GetCoreObject()

-- Helper function to use ox_lib notifications if enabled
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

-- Additional commands for police operations
RegisterCommand('setcallsign', function(_, args)
    local PlayerData = QBCore.Functions.GetPlayerData()
    if PlayerData.job.name ~= Config.RequireJobName then
        Notify(Lang:t('error.not_authorized'), 'error')
        return
    end

    if not args[1] then
        Notify('Please specify a callsign', 'error')
        return
    end

    TriggerServerEvent('mdt:server:SetCallsign', args[1])
end, false)

RegisterCommand('checkwarrants', function()
    local PlayerData = QBCore.Functions.GetPlayerData()
    if PlayerData.job.name ~= Config.RequireJobName then
        Notify(Lang:t('error.not_authorized'), 'error')
        return
    end

    TriggerServerEvent('mdt:server:CheckWarrants')
end, false)

-- Add ANPR related commands
if Config.EnableANPR then
    RegisterCommand('vehiclecheck', function(_, args)
        local PlayerData = QBCore.Functions.GetPlayerData()
        if PlayerData.job.name ~= Config.RequireJobName then
            Notify(Lang:t('error.not_authorized'), 'error')
            return
        end
        
        if not args[1] then
            Notify('Please specify a plate number', 'error')
            return
        end
        
        TriggerServerEvent('mdt:server:ANPRScan', args[1])
    end, false)
end
