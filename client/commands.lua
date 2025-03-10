
local QBCore = exports['qb-core']:GetCoreObject()

-- Additional commands for police operations
RegisterCommand('setcallsign', function(_, args)
    local PlayerData = QBCore.Functions.GetPlayerData()
    if PlayerData.job.name ~= Config.RequireJobName then
        QBCore.Functions.Notify(Lang:t('error.not_authorized'), 'error')
        return
    end

    if not args[1] then
        QBCore.Functions.Notify('Please specify a callsign', 'error')
        return
    end

    TriggerServerEvent('mdt:server:SetCallsign', args[1])
end, false)

RegisterCommand('checkwarrants', function()
    local PlayerData = QBCore.Functions.GetPlayerData()
    if PlayerData.job.name ~= Config.RequireJobName then
        QBCore.Functions.Notify(Lang:t('error.not_authorized'), 'error')
        return
    end

    TriggerServerEvent('mdt:server:CheckWarrants')
end, false)
