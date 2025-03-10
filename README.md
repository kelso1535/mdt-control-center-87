
# QB-Core Police MDT System

A modern police Mobile Data Terminal (MDT) system for QB-Core FiveM servers.

## Features

- Modern, responsive UI with a realistic MDT look and feel
- Officer login with callsign verification
- Status updates for officers
- Person, vehicle, and serial number searches
- Criminal and traffic history lookups
- Warrant system
- Duress/emergency functionality
- Officer tracking for command staff

## Installation

1. Copy this resource to your server's resource folder
2. Add `ensure qb-mdt` to your server.cfg
3. Configure the `config.lua` file to match your server's needs
4. Build the web UI (see instructions below)
5. Restart your server

## Building the Web UI

```bash
cd web
npm install
npm run build
```

## Commands

- `/mdt` - Open the MDT interface
- `/setcallsign [callsign]` - Set your officer callsign
- `/checkwarrants` - Check active warrants

## Configuration

You can configure the MDT system in the `config.lua` file:

- Job requirements
- Command and key bindings
- Callsign requirements
- Status options
- Department name

## Dependencies

- QB-Core framework
- oxmysql

## Credits

Developed by Lovable AI for QB-Core FiveM servers.
