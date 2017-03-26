-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2017 at 03:59 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `address_management_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `street_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `route` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ward_or_willage` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `district_or_town` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `city_or_province` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `method_type` enum('TEXT_INPUTS','GOOGLE_MAP_OBJECT','PLACE_AUTO_COMPLETE') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `street_number`, `route`, `ward_or_willage`, `district_or_town`, `city_or_province`, `country`, `method_type`) VALUES
(28, '66/4', 'Pho Quang', 'Phuong 2', 'Tan Binh', 'Ho Chi Minh', 'Viet Nam', 'TEXT_INPUTS'),
(29, '72/4', 'Mau Than', 'Phuong An thoi', 'Ninh Kieu', 'Can Tho', 'Viet Name', 'TEXT_INPUTS'),
(30, '1', 'Phan Văn Trường', NULL, 'Thành phố Huế', 'Thừa Thiên Huế', 'Vietnam', 'GOOGLE_MAP_OBJECT'),
(31, '1', 'Nguyễn Thị Định', '', 'Quận 2', 'Hồ Chí Minh', 'Vietnam', 'GOOGLE_MAP_OBJECT'),
(32, '2/5', '30/4', 'Cai Khe', 'Ninh Kieu', 'Can Tho', 'Viet Name', 'TEXT_INPUTS'),
(33, '44', 'Pasley Road', '', 'Leicestershire', 'England', 'United Kingdom', 'GOOGLE_MAP_OBJECT');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
