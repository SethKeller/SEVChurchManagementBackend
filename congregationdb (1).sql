-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 07, 2021 at 07:11 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `congregationdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `City` varchar(255) DEFAULT NULL,
  `HouseNumber` varchar(255) DEFAULT NULL,
  `Street` varchar(255) DEFAULT NULL,
  `State` varchar(255) DEFAULT NULL,
  `Zipcode` varchar(255) DEFAULT NULL,
  `Active` int(11) DEFAULT NULL,
  `PersonId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `congregations`
--

CREATE TABLE `congregations` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `congregations`
--

INSERT INTO `congregations` (`id`, `Name`, `Address`, `Phone`) VALUES
(1, 'Wilshire Church', 'S Street', '888888');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `families`
--

CREATE TABLE `families` (
  `id` int(11) NOT NULL,
  `FamilyName` varchar(255) DEFAULT NULL,
  `CongregationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `families`
--

INSERT INTO `families` (`id`, `FamilyName`, `CongregationId`) VALUES
(1, 'House Stark', 1),
(2, 'House Lannister', 1),
(3, 'House Baratheon', 1),
(4, 'House Targaryen', 1),
(5, 'House Tyrell', 1);

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` int(11) NOT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `DisplayName` varchar(255) DEFAULT NULL,
  `DateofBirth` datetime DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `HousePhone` varchar(255) DEFAULT NULL,
  `FamilyRole` int(11) DEFAULT NULL,
  `CongregationId` int(11) DEFAULT NULL,
  `FamilyId` int(11) DEFAULT NULL,
  `EventId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `FirstName`, `LastName`, `DisplayName`, `DateofBirth`, `Email`, `Phone`, `Password`, `HousePhone`, `FamilyRole`, `CongregationId`, `FamilyId`, `EventId`) VALUES
(1, 'Jon', 'Snow', 'Jon Snow', NULL, 'kingofthenorth@gmail.com', NULL, '', NULL, NULL, NULL, 1, NULL),
(2, 'Arya', 'Stark', 'Arya Stark', NULL, 'noone@gmail.com', NULL, '', NULL, NULL, NULL, 1, NULL),
(3, 'Sansa', 'Stark', 'Sansa Stark', NULL, 'littledove@gmail.com', NULL, '', NULL, NULL, NULL, 1, NULL),
(4, 'Tywin', 'Lannister', 'Tywin Lannister', NULL, 'LordofCasterlyRock@gmail.com', NULL, NULL, NULL, NULL, NULL, 2, NULL),
(5, 'Tyrion', 'Lannister', 'Tyrion Lannister', NULL, 'TheHalfMan@gmail.com', NULL, NULL, NULL, NULL, NULL, 2, NULL),
(6, 'Jamie', 'Lannister', 'Jamie Lannister', NULL, 'OathKeeper@gmail.com', '5551234', NULL, NULL, NULL, NULL, 2, NULL),
(7, 'Catelyn', 'Stark', 'Catelyn Stark', NULL, 'cat@gmail.com', '5552543', NULL, NULL, NULL, NULL, 1, NULL),
(8, 'Brandon', 'Stark', 'Brandon Stark', NULL, 'TheWingedWolf@gmail.com', '5557983', NULL, NULL, NULL, NULL, 1, NULL),
(9, 'Cersei', 'Lannister', 'Cersei Lannister', NULL, 'QueenMother@gmail.com', '5557999', NULL, NULL, NULL, NULL, 2, NULL),
(10, 'Daenerys', 'Stormborn', 'Daenerys Stormborn of the House Targaryen, the First of Her Name, the Unburnt, Queen of Meereen, Queen of the Andals and the First Men, Breaker of Chains and Mother of Dragons', NULL, 'MotherofDragons@gmail.com', '5559879', NULL, NULL, NULL, NULL, 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Number` int(11) DEFAULT NULL,
  `CongregationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PersonId` (`PersonId`);

--
-- Indexes for table `congregations`
--
ALTER TABLE `congregations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `families`
--
ALTER TABLE `families`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CongregationId` (`CongregationId`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CongregationId` (`CongregationId`),
  ADD KEY `FamilyId` (`FamilyId`),
  ADD KEY `EventId` (`EventId`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CongregationId` (`CongregationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `congregations`
--
ALTER TABLE `congregations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `families`
--
ALTER TABLE `families`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`PersonId`) REFERENCES `people` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `families`
--
ALTER TABLE `families`
  ADD CONSTRAINT `families_ibfk_1` FOREIGN KEY (`CongregationId`) REFERENCES `congregations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `people`
--
ALTER TABLE `people`
  ADD CONSTRAINT `people_ibfk_1` FOREIGN KEY (`CongregationId`) REFERENCES `congregations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `people_ibfk_2` FOREIGN KEY (`FamilyId`) REFERENCES `families` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `people_ibfk_3` FOREIGN KEY (`EventId`) REFERENCES `events` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`CongregationId`) REFERENCES `congregations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
