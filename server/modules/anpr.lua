
local QBCore = require 'server.core'
local Config = require 'config'
local SearchHistory = require 'server.modules.search_history'

-- ANPR scanning functionality
RegisterNetEvent('mdt:server:ANPRScan', function(plate)
    local src = source
    if not plate then return end
    
    -- Log the ANPR scan
    SearchHistory.AddToSearchHistory(src, 'ANPR', plate)
    
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
