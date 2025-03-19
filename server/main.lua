
-- Standalone MDT Server side
local Config = require 'config'

-- Hash table for active sessions
local ActiveSessions = {}
local SearchHistory = {}

-- Basic session management functions
local function CreateSession(source, callsign)
    ActiveSessions[tostring(source)] = {
        source = source,
        callsign = callsign,
        lastActive = os.time()
    }
end

local function GetSession(source)
    return ActiveSessions[tostring(source)]
end

local function UpdateSession(source, data)
    if ActiveSessions[tostring(source)] then
        for k, v in pairs(data) do
            ActiveSessions[tostring(source)][k] = v
        end
        ActiveSessions[tostring(source)].lastActive = os.time()
    end
end

local function DestroySession(source)
    ActiveSessions[tostring(source)] = nil
end

-- Register server callback system for standalone
local ServerCallbacks = {}

function RegisterServerCallback(name, cb)
    ServerCallbacks[name] = cb
end

RegisterNetEvent('mdt:server:TriggerCallback')
AddEventHandler('mdt:server:TriggerCallback', function(name, ...)
    local source = source
    local callback = table.remove(arg)
    
    if ServerCallbacks[name] then
        ServerCallbacks[name](source, function(...)
            TriggerClientEvent('mdt:client:TriggerCallback', source, name, ...)
        end, table.unpack(arg))
    else
        print('MDT: Server callback ' .. name .. ' does not exist')
    end
end)

-- Event handler: Set callsign
RegisterNetEvent('mdt:server:SetCallsign')
AddEventHandler('mdt:server:SetCallsign', function(callsign)
    local src = source
    local playerData = Config.Framework.GetPlayerData(src)
    
    if playerData and playerData.job.name == Config.RequireJobName then
        CreateSession(src, callsign)
        Config.Framework.Notify(src, 'Callsign set to: ' .. callsign, 'success')
    end
end)

-- Search history functions
local function AddToSearchHistory(source, searchType, query)
    local timestamp = os.date("%Y-%m-%d %H:%M")
    local session = GetSession(source)
    
    if not session then
        return
    end
    
    local searchId = #SearchHistory + 1
    
    SearchHistory[searchId] = {
        id = searchId,
        officer = session.callsign or ('Officer ' .. source),
        callsign = session.callsign or 'Unknown',
        timestamp = timestamp,
        type = searchType,
        query = query
    }
    
    -- Keep only the last 50 searches
    if #SearchHistory > 50 then
        table.remove(SearchHistory, 1)
    end
end

-- Server callbacks for search history
RegisterServerCallback('mdt:server:GetSearchHistory', function(source, cb)
    cb(SearchHistory)
end)

-- Server callbacks for searches
RegisterServerCallback('mdt:server:SearchPerson', function(source, cb, name)
    -- Log the person search
    AddToSearchHistory(source, 'Person', name)
    
    -- This would typically query the database for person information
    -- For now returning mock data
    local results = {
        {
            id = 'p1',
            name = name,
            dob = '1990-01-15',
            gender = 'Male',
            phone = '555-123-4567',
            address = '123 Main St',
            wanted = false
        }
    }
    
    cb(results)
end)

RegisterServerCallback('mdt:server:SearchVehicle', function(source, cb, plate)
    -- Log the vehicle search
    AddToSearchHistory(source, 'Vehicle', plate)
    
    -- This would typically query the database for vehicle information
    -- For now returning mock data
    local results = {
        {
            plate = plate,
            model = 'Sultan',
            color = 'Blue',
            owner = 'John Doe',
            stolen = false,
            insurance = 'Valid'
        }
    }
    
    cb(results)
end)

RegisterServerCallback('mdt:server:GetWarrants', function(source, cb)
    -- Log the warrant search
    AddToSearchHistory(source, 'Warrant', 'All Active Warrants')
    
    -- Query database for active warrants
    -- Mock data for now
    local warrants = {
        {
            id = 'w1',
            name = 'Jane Doe',
            date = '2024-02-15',
            charges = 'Assault, Theft',
            status = 'Active'
        }
    }
    
    cb(warrants)
end)

-- ANPR scanning functionality
RegisterNetEvent('mdt:server:ANPRScan')
AddEventHandler('mdt:server:ANPRScan', function(plate)
    local src = source
    if not plate then return end
    
    -- Log the ANPR scan
    AddToSearchHistory(src, 'ANPR', plate)
    
    plate = string.gsub(plate, "^%s*(.-)%s*$", "%1") -- Trim whitespace
    
    -- Mock data since this is standalone
    local result = {
        plate = plate,
        owner = "John Doe",
        model = "Sultan",
        stolen = false
    }
    
    TriggerClientEvent('mdt:client:ANPRResults', src, result)
end)

-- Additional server events
RegisterNetEvent('police:server:UpdateStatus')
AddEventHandler('police:server:UpdateStatus', function(status)
    local src = source
    local session = GetSession(src)
    
    if session then
        -- Update officer status
        UpdateSession(src, {status = status})
        Config.Framework.Notify(src, 'Status updated to: ' .. status, 'success')
    end
end)

RegisterNetEvent('police:server:DuressSignal')
AddEventHandler('police:server:DuressSignal', function(coords)
    local src = source
    local session = GetSession(src)
    
    if session then
        -- In a real implementation, this would alert other police officers
        Config.Framework.Notify(src, 'EMERGENCY: Duress signal sent', 'error')
    end
end)

-- Clean up when player disconnects
AddEventHandler('playerDropped', function()
    local src = source
    DestroySession(src)
end)

-- Auto-complete resource initial setup
AddEventHandler('onResourceStart', function(resource)
    if resource == GetCurrentResourceName() then
        print('Standalone MDT system initialized')
    end
end)
