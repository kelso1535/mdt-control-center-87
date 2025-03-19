
local Config = {}

-- MDT Configuration
Config.RequireJobName = 'police' -- Job name required to access MDT
Config.OpenCommand = 'mdt'      -- Command to open MDT
Config.OpenKey = 'F6'           -- Key to open MDT (leave empty to disable)
Config.EnableCallsign = true    -- Enable callsign requirements for login

-- Status options
Config.StatusOptions = {
    'Code 1 On Patrol',
    'Code 2 Arrived at Station', 
    'Code 4 Traffic Stop',
    'Code 5 Arrived on Scene',
    'Code 6 Unavailable'
}

-- Department configuration
Config.DepartmentName = 'Oceanic Police Force'

-- Notification settings
Config.UseOxLib = true -- Set to true to use ox_lib for notifications

-- ANPR Configuration
Config.EnableANPR = true -- Enable ANPR integration
Config.ANPRScanDistance = 7.0 -- Distance in meters for ANPR scanning
Config.ManualANPRKey = 'PAGEDOWN' -- Key for manual ANPR scan

-- DMV Integration 
Config.EnableDMVIntegration = true -- Enable DMV database integration

-- Search History
Config.EnableSearchHistory = true -- Enable search history tracking

return Config
