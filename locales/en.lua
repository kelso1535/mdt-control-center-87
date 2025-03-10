
local Translations = {
    error = {
        not_authorized = 'You are not authorized to use the MDT',
        no_callsign = 'You need to set a callsign first',
        server_error = 'Server error occurred'
    },
    success = {
        logged_in = 'Successfully logged into MDT',
        logged_out = 'Successfully logged out of MDT',
        status_changed = 'Status changed to %{status}'
    },
    info = {
        mdt_opened = 'MDT opened',
        mdt_closed = 'MDT closed',
    },
    ui = {
        login = 'Login to MDT',
        enter_callsign = 'Enter your callsign',
        change_status = 'Change Status',
        duress = 'DURESS',
        flag_stolen = 'Flag Police Unit Stolen',
        logout = 'Logout of MDT',
        exit = 'Exit',
    }
}

Lang = Locale:new({
    phrases = Translations,
    warnOnMissing = true
})
