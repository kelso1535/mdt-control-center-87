
local QBCore = require 'server.core'
local Config = require 'config'

-- Server events for officer actions
RegisterNetEvent('mdt:server:SetCallsign', function(callsign)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    
    if Player then
        -- Update player metadata with new callsign
        Player.Functions.SetMetaData('callsign', callsign)
        if Config.UseOxLib then
            TriggerClientEvent('ox_lib:notify', src, {
                title = 'Police MDT',
                description = 'Callsign set to: ' .. callsign,
                type = 'success'
            })
        else
            TriggerClientEvent('QBCore:Notify', src, 'Callsign set to: ' .. callsign, 'success')
        end
    end
end)

RegisterNetEvent('police:server:UpdateStatus', function(status)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    
    if Player then
        -- Update officer status in database or state bag
        -- For now just notify all police
        local players = QBCore.Functions.GetQBPlayers()
        local officerName = Player.PlayerData.charinfo.firstname .. ' ' .. Player.PlayerData.charinfo.lastname
        local message = officerName .. ' is now: ' .. status
        
        for _, v in pairs(players) do
            if v.PlayerData.job.name == Config.RequireJobName then
                if Config.UseOxLib then
                    TriggerClientEvent('ox_lib:notify', v.PlayerData.source, {
                        title = 'Officer Status Update',
                        description = message,
                        type = 'inform'
                    })
                else
                    TriggerClientEvent('QBCore:Notify', v.PlayerData.source, message, 'primary')
                end
            end
        end
    end
end)

RegisterNetEvent('police:server:DuressSignal', function(coords)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    
    if Player then
        -- Send emergency alert to all police
        local players = QBCore.Functions.GetQBPlayers()
        local callsign = Player.PlayerData.metadata.callsign or 'Unknown'
        local name = Player.PlayerData.charinfo.firstname .. ' ' .. Player.PlayerData.charinfo.lastname
        local message = 'DURESS SIGNAL: Officer ' .. callsign .. ' (' .. name .. ')'
        
        for _, v in pairs(players) do
            if v.PlayerData.job.name == Config.RequireJobName then
                if Config.UseOxLib then
                    TriggerClientEvent('ox_lib:notify', v.PlayerData.source, {
                        title = 'EMERGENCY ALERT',
                        description = message,
                        type = 'error',
                        duration = 10000
                    })
                else
                    TriggerClientEvent('QBCore:Notify', v.PlayerData.source, message, 'error')
                end
                
                -- Would typically also send the location to the map
                if coords then
                    -- Example: TriggerClientEvent('mdt:client:SetEmergencyWaypoint', v.PlayerData.source, coords)
                end
            end
        end
    end
end)

RegisterNetEvent('police:server:FlagVehicleStolen', function(plate)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    
    if Player and plate then
        -- Update vehicle as stolen in database
        -- For now just notify all police
        local players = QBCore.Functions.GetQBPlayers()
        local callsign = Player.PlayerData.metadata.callsign or 'Unknown'
        local message = 'Vehicle flagged as stolen: ' .. plate .. ' by ' .. callsign
        
        for _, v in pairs(players) do
            if v.PlayerData.job.name == Config.RequireJobName then
                if Config.UseOxLib then
                    TriggerClientEvent('ox_lib:notify', v.PlayerData.source, {
                        title = 'STOLEN VEHICLE ALERT',
                        description = message,
                        type = 'error'
                    })
                else
                    TriggerClientEvent('QBCore:Notify', v.PlayerData.source, message, 'error')
                end
            end
        end
    end
end)
