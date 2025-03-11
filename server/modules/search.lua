
local QBCore = require 'server.core'
local SearchHistory = require 'server.modules.search_history'

-- Server callbacks for searches
QBCore.Functions.CreateCallback('mdt:server:SearchPerson', function(source, cb, name)
    -- Log the person search
    SearchHistory.AddToSearchHistory(source, 'Person', name)
    
    -- This would typically query the database for person information
    -- For now returning mock data
    local results = {}
    -- Query would look like: MySQL.query.await('SELECT * FROM players WHERE LOWER(charinfo) LIKE ?', {string.lower('%'..name..'%')})
    
    cb(results)
end)

QBCore.Functions.CreateCallback('mdt:server:SearchVehicle', function(source, cb, plate)
    -- Log the vehicle search
    SearchHistory.AddToSearchHistory(source, 'Vehicle', plate)
    
    -- This would typically query the database for vehicle information
    -- For now returning mock data
    local results = {}
    -- Query would look like: MySQL.query.await('SELECT * FROM player_vehicles WHERE plate LIKE ?', {string.upper('%'..plate..'%')})
    
    cb(results)
end)

QBCore.Functions.CreateCallback('mdt:server:GetWarrants', function(source, cb)
    -- Log the warrant search
    SearchHistory.AddToSearchHistory(source, 'Warrant', 'All Active Warrants')
    
    -- Query database for active warrants
    -- Mock data for now
    local warrants = {}
    
    cb(warrants)
end)
