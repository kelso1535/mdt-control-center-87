
local QBCore = require 'server.core'
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

-- Create the callback for getting search history
QBCore.Functions.CreateCallback('mdt:server:GetSearchHistory', function(source, cb)
    cb(searchHistory)
end)

return {
    AddToSearchHistory = AddToSearchHistory,
    GetSearchHistory = function() return searchHistory end
}
