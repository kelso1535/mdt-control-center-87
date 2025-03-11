local QBCore = exports['qb-core']:GetCoreObject()
local searchHistory = {}

-- Function to add a search to history
local function AddToSearchHistory(source, searchType, query)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return end
    
    local timestamp = os.date("%Y-%m-%d %H:%M")
    local searchId = #searchHistory + 1
    
    searchHistory[searchId] = {
        id = searchId,
        officer = Player.PlayerData.charinfo.firstname .. ' ' .. Player.PlayerData.charinfo.lastname,
        callsign = Player.PlayerData.metadata.callsign or 'Unknown',
        timestamp = timestamp,
        type = searchType,
        query = query
    }
    
    -- Keep only the last 50 searches
    if #searchHistory > 50 then
        table.remove(searchHistory, 1)
    end
end

-- Server callbacks
QBCore.Functions.CreateCallback('mdt:server:SearchPerson', function(source, cb, name)
    -- Log the person search
    AddToSearchHistory(source, 'Person', name)
    
    -- This would typically query the database for person information
    -- For now returning mock data
    local results = {}
    -- Query would look like: MySQL.query.await('SELECT * FROM players WHERE LOWER(charinfo) LIKE ?', {string.lower('%'..name..'%')})
    
    cb(results)
end)

QBCore.Functions.CreateCallback('mdt:server:SearchVehicle', function(source, cb, plate)
    -- Log the vehicle search
    AddToSearchHistory(source, 'Vehicle', plate)
    
    -- This would typically query the database for vehicle information
    -- For now returning mock data
    local results = {}
    -- Query would look like: MySQL.query.await('SELECT * FROM player_vehicles WHERE plate LIKE ?', {string.upper('%'..plate..'%')})
    
    cb(results)
end)

QBCore.Functions.CreateCallback('mdt:server:GetWarrants', function(source, cb)
    -- Log the warrant search
    AddToSearchHistory(source, 'Warrant', 'All Active Warrants')
    
    -- Query database for active warrants
    -- Mock data for now
    local warrants = {}
    
    cb(warrants)
end)

QBCore.Functions.CreateCallback('mdt:server:GetSearchHistory', function(source, cb)
    cb(searchHistory)
end)

-- ANPR scanning functionality
RegisterNetEvent('mdt:server:ANPRScan', function(plate)
    local src = source
    if not plate then return end
    
    -- Log the ANPR scan
    AddToSearchHistory(src, 'ANPR', plate)
    
    plate = string.gsub(plate, "^%s*(.-)%s*$", "%1") -- Trim whitespace
    
    -- Query the database for the vehicle and owner information
    -- This is where you would connect to a DMV script if available
    if Config.EnableDMVIntegration then
        -- Example of DMV integration placeholder:
        -- local vehicleInfo = exports['qb-dmv']:getVehicleInformation(plate)
        
        -- Mock data for now
        local vehicleInfo = {
            plate = plate,
            owner = "John Doe", -- This would come from your DMV or vehicle database
            model = "Sultan",
            stolen = false
        }
        
        TriggerClientEvent('mdt:client:ANPRResults', src, vehicleInfo)
    else
        -- Fallback to just using the player_vehicles table
        local vehicleData = MySQL.query.await('SELECT pv.*, p.charinfo FROM player_vehicles pv LEFT JOIN players p ON pv.citizenid = p.citizenid WHERE pv.plate = ?', {plate})
        
        local result = {
            plate = plate
        }
        
        if vehicleData and vehicleData[1] then
            local charinfo = json.decode(vehicleData[1].charinfo)
            result.owner = charinfo.firstname .. ' ' .. charinfo.lastname
            result.model = vehicleData[1].vehicle
            result.stolen = false -- You could add logic here to check if the vehicle is marked as stolen
        else
            result.owner = "Unknown"
            result.model = "Unknown"
            result.stolen = false
        end
        
        TriggerClientEvent('mdt:client:ANPRResults', src, result)
    end
end)

-- Server events
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

-- Auto-complete resource initial setup
AddEventHandler('onResourceStart', function(resource)
    if resource == GetCurrentResourceName() then
        print('QB MDT system initialized')
        -- Could perform database setup here if needed
    end
end)
