
Config = {}

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
Config.DepartmentName = 'Los Santos Police Department'

-- Notification settings
Config.UseOxLib = false -- Set to true if using ox_lib for notifications
