
local Translations = {
    error = {
        not_authorized = 'You are not authorized to use the MDT',
        no_callsign = 'You need to set a callsign first',
        server_error = 'Server error occurred',
        anpr_no_vehicle = 'No vehicle detected in range'
    },
    success = {
        logged_in = 'Successfully logged into MDT',
        logged_out = 'Successfully logged out of MDT',
        status_changed = 'Status changed to %{status}',
        anpr_scan = 'ANPR Scan: %{plate}',
        history_refreshed = 'Search history refreshed'
    },
    info = {
        mdt_opened = 'MDT opened',
        mdt_closed = 'MDT closed',
        anpr_scanning = 'Scanning vehicles...',
        manual_anpr = 'Manual ANPR scan initiated (PageDown key)'
    },
    ui = {
        login = 'Login to MDT',
        enter_callsign = 'Enter your callsign',
        change_status = 'Change Status',
        duress = 'DURESS',
        flag_stolen = 'Flag Police Unit Stolen',
        logout = 'Logout of MDT',
        exit = 'Exit',
        anpr = 'ANPR Scan',
        history = 'Search History',
        refresh = 'Refresh'
    }
}

Lang = Locale:new({
    phrases = Translations,
    warnOnMissing = true
})
