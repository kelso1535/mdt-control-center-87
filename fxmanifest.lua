
fx_version 'cerulean'
game 'gta5'

author 'Lovable AI'
description 'QB-Core Police MDT System'
version '1.0.0'

ui_page 'web/dist/index.html'

shared_scripts {
    '@qb-core/shared/locale.lua',
    'locales/en.lua',
    'config.lua'
}

client_scripts {
    'client/main.lua',
    'client/commands.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua'
}

files {
    'web/dist/index.html',
    'web/dist/**/*'
}

lua54 'yes'
