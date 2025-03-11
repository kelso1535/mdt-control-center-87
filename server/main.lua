
-- QB MDT Server side
local QBCore = require 'server.core'

-- Load all modules
require 'server.modules.search_history'
require 'server.modules.search'
require 'server.modules.anpr'
require 'server.modules.officer'

-- Auto-complete resource initial setup
AddEventHandler('onResourceStart', function(resource)
    if resource == GetCurrentResourceName() then
        print('QB MDT system initialized')
        -- Could perform database setup here if needed
    end
end)
