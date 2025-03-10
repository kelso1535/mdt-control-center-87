
# Installation Guide for QB-MDT

This guide will walk you through the process of installing and configuring the QB-MDT resource for your QB-Core FiveM server.

## Prerequisites

- A working QB-Core FiveM server
- oxmysql resource installed and configured
- Node.js and npm (for building the web UI)

## Step 1: Download and Extract

1. Download the QB-MDT resource
2. Extract the files to your server's resources directory
3. Rename the folder to `qb-mdt` if it's not already named that

## Step 2: Build the Web UI

1. Open your terminal/command prompt
2. Navigate to the web directory inside the qb-mdt resource:
   ```
   cd /path/to/server/resources/qb-mdt/web
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Build the UI:
   ```
   npm run build
   ```
   This will create a `dist` folder with the compiled web assets.

## Step 3: Configure the Resource

1. Open the `config.lua` file in the resource directory
2. Edit the configuration options to match your server's needs:
   - Set the required job name(s)
   - Configure commands and keybinds
   - Adjust status options
   - Set your department name

## Step 4: Add to Server Config

Add the following line to your server.cfg file:
```
ensure qb-mdt
```

## Step 5: Start or Restart Server

Restart your server or start the resource with:
```
refresh
ensure qb-mdt
```

## Usage

- Use the `/mdt` command or press F6 (if configured) to open the MDT
- Set your callsign with `/setcallsign [callsign]` if needed
- Login with your callsign on the MDT login screen

## Troubleshooting

- If the MDT doesn't appear, check your server console for errors
- Ensure that all dependencies are installed and working
- Verify that you've built the web UI correctly
- Make sure your job and permissions are set correctly in QB-Core

## Additional Configuration

### Adding Custom Charges and Fines

You can add custom charges and fines by editing the database or implementing additional server events.

### Changing UI Colors and Styling

1. Edit the CSS files in the web/src directory before building
2. Rebuild the web UI with `npm run build`

### Adding Translations

1. Copy the locales/en.lua file
2. Rename it to your language code (e.g., es.lua for Spanish)
3. Translate the strings in the file
4. Add your language file to the fxmanifest.lua
