
# QBCore MDT Installation Guide

This guide will walk you through setting up the MDT (Mobile Data Terminal) for your QBCore FiveM server.

## Prerequisites

- A running QBCore FiveM server
- Basic knowledge of server configuration and resources
- Access to your server files
- Node.js and npm installed on your development machine

## Installation Steps

### Step 1: Resource Setup

1. Download or clone the MDT resource to your server's resources folder
2. Rename the folder to `qb-mdt` (if it's not already named that)

### Step 2: Build the Web Interface

1. Navigate to the `web` directory inside the resource folder
2. Open a command prompt/terminal in this directory
3. Run the following commands:
   ```bash
   npm install
   npm run build
   ```
   This will install all dependencies and build the web interface

### Step 3: Server Configuration

1. Add the following to your `server.cfg` file:
   ```
   ensure qb-mdt
   ```

2. Configure the permissions in the `config.lua` file to set which jobs have access to the MDT:
   ```lua
   Config.Jobs = {
       ["police"] = true,
       ["bcso"] = true,  -- Add any other police departments
       ["judge"] = true  -- For magistrate access
   }
   ```

### Step 4: Database Setup

1. Import the included `mdt.sql` file to your database to create the necessary tables
   ```sql
   -- Example mdt.sql content
   CREATE TABLE IF NOT EXISTS `mdt_reports` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `identifier` varchar(50) DEFAULT NULL,
     `title` varchar(255) DEFAULT NULL,
     `incident` longtext DEFAULT NULL,
     `created` timestamp NULL DEFAULT current_timestamp(),
     `updated` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
     `author` varchar(50) DEFAULT NULL,
     PRIMARY KEY (`id`)
   );

   CREATE TABLE IF NOT EXISTS `mdt_court_cases` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `title` varchar(255) NOT NULL,
     `defendant` varchar(50) NOT NULL,
     `date` varchar(50) DEFAULT NULL,
     `time` varchar(50) DEFAULT NULL,
     `charges` longtext DEFAULT NULL,
     `status` varchar(20) DEFAULT 'pending',
     `created_by` varchar(50) DEFAULT NULL,
     PRIMARY KEY (`id`)
   );
   ```

2. Ensure your QBCore database connection is properly configured

### Step 5: In-Game Usage

1. The MDT can be accessed by:
   - Using the `/mdt` command
   - Pressing the configured keybind (default: F8)
   - Using a computer object in police stations (if configured)

2. Officers can log in with their callsign
3. Magistrates can log in by selecting the "Magistrate" option at login

## Features

- **For Police Officers:**
  - Search people, vehicles, and weapon serials
  - File reports and criminal charges
  - View and update officer status
  - Create court cases for the judicial system
  - Access financial and traffic records

- **For Magistrates:**
  - Manage court cases
  - Set availability for hearings
  - Review and adjudicate cases
  - Issue warrants and judicial orders

## Troubleshooting

If you encounter issues:

1. Check the server console for error messages
2. Verify your database connection settings
3. Ensure all dependencies are properly installed
4. Make sure the job permissions are correctly configured
5. Check that the resource is started in the correct order (after QB-Core)

## Customization

You can customize:

- UI colors and themes in the CSS files
- Job permissions in the config.lua
- Available officer statuses
- Access methods and commands

For any further assistance, please refer to the documentation or contact support.
