
local Config = {}

-- MDT Configuration
Config.RequireJobName = 'police' -- Job name required to access MDT
Config.OpenCommand = 'mdt'      -- Command to open MDT
Config.OpenKey = 'F6'           -- Key to open MDT (leave empty to disable)
Config.EnableCallsign = true    -- Enable callsign requirements for login
Config.AdminPassword = 'admin123' -- Admin password to access admin features

-- Status options
Config.StatusOptions = {
    'Available',
    'Busy', 
    'On Scene',
    'Responding',
    'Off Duty'
}

-- Department configuration
Config.DepartmentName = 'Police Department'

-- Notification settings
Config.UseOxLib = true -- Set to true to use ox_lib for notifications

-- ANPR Configuration
Config.EnableANPR = true -- Enable ANPR integration
Config.ANPRScanDistance = 7.0 -- Distance in meters for ANPR scanning
Config.ManualANPRKey = 'PAGEDOWN' -- Key for manual ANPR scan

-- DMV Integration 
Config.EnableDMVIntegration = false -- Enable DMV database integration

-- Search History
Config.EnableSearchHistory = true -- Enable search history tracking

-- Framework functions (modify these functions according to your framework)
Config.Framework = {
    -- Player Functions
    GetPlayerData = function(source)
        -- Return a compatible player data structure
        return {
            job = { name = 'police' },
            source = source,
            name = 'Officer ' .. source,
            metadata = { 
                callsign = 'UNIT-' .. source 
            },
            citizenid = 'CITIZEN' .. source,
            charinfo = { 
                firstname = 'Officer',
                lastname = source
            }
        }
    end,
    
    -- Notification Functions
    Notify = function(source, message, type)
        if Config.UseOxLib then
            TriggerClientEvent('ox_lib:notify', source, {
                title = 'Police MDT',
                description = message,
                type = type or 'inform'
            })
        else
            TriggerClientEvent('mdt:client:Notify', source, message, type)
        end
    end
}

return Config
