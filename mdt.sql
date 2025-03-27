
-- MDT Database Tables for QBCore

-- Reports table to store all police reports
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

-- Profiles table for storing cached citizen information
CREATE TABLE IF NOT EXISTS `mdt_profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `notes` longtext DEFAULT NULL,
  `fingerprint` varchar(50) DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `identifier` (`identifier`)
);

-- Vehicle records
CREATE TABLE IF NOT EXISTS `mdt_vehicles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plate` varchar(8) NOT NULL,
  `owner` varchar(50) DEFAULT NULL,
  `stolen` tinyint(1) DEFAULT 0,
  `notes` longtext DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `plate` (`plate`)
);

-- Citations for traffic offenses
CREATE TABLE IF NOT EXISTS `mdt_citations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(50) DEFAULT NULL,
  `offense` varchar(255) DEFAULT NULL,
  `fine` int(11) DEFAULT NULL,
  `issued_date` timestamp NULL DEFAULT current_timestamp(),
  `officer` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Court cases
CREATE TABLE IF NOT EXISTS `mdt_court_cases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `defendant` varchar(50) NOT NULL,
  `prosecutor` varchar(50) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  `charges` longtext DEFAULT NULL,
  `witnesses` longtext DEFAULT NULL,
  `evidence` longtext DEFAULT NULL,
  `notes` longtext DEFAULT NULL,
  `verdict` varchar(50) DEFAULT NULL,
  `sentence` longtext DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);

-- Magistrate availability
CREATE TABLE IF NOT EXISTS `mdt_magistrate_availability` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `day` varchar(50) NOT NULL,
  `start_time` varchar(10) NOT NULL,
  `end_time` varchar(10) NOT NULL,
  `notes` text DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Weapon serials
CREATE TABLE IF NOT EXISTS `mdt_weapon_serials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serial` varchar(50) NOT NULL,
  `weapon` varchar(50) NOT NULL,
  `owner` varchar(50) DEFAULT NULL,
  `registered_date` timestamp NULL DEFAULT current_timestamp(),
  `notes` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `serial` (`serial`)
);

-- Warrants
CREATE TABLE IF NOT EXISTS `mdt_warrants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `reason` text NOT NULL,
  `issued_by` varchar(255) NOT NULL,
  `issued_at` timestamp NULL DEFAULT current_timestamp(),
  `expires_at` timestamp NULL DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  PRIMARY KEY (`id`)
);

-- Officer actions log
CREATE TABLE IF NOT EXISTS `mdt_action_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `officer` varchar(50) NOT NULL,
  `action` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);

-- Search history
CREATE TABLE IF NOT EXISTS `mdt_search_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `officer` varchar(50) NOT NULL,
  `search_type` varchar(50) NOT NULL,
  `search_value` varchar(255) NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);

-- Insert some default data for testing
INSERT INTO `mdt_magistrate_availability` (`identifier`, `name`, `day`, `start_time`, `end_time`, `notes`) VALUES
('judge1', 'Judge Holden', 'Monday', '09:00', '17:00', 'Available for emergency hearings'),
('judge1', 'Judge Holden', 'Wednesday', '13:00', '19:00', 'Court room 1'),
('judge2', 'Judge Judy', 'Tuesday', '10:00', '16:00', 'Court room 2'),
('judge2', 'Judge Judy', 'Thursday', '09:00', '15:00', 'Court room 2'),
('judge2', 'Judge Judy', 'Friday', '14:00', '20:00', 'Court room 1');
