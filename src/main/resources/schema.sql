-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: real-estate-booking-app
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

SET FOREIGN_KEY_CHECKS=0;

CREATE DATABASE IF NOT EXISTS `real-estate-booking-app`;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
                            `id` int(11) NOT NULL AUTO_INCREMENT,
                            `text` text,
                            `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                            `user_id` int(11) NOT NULL,
                            `real_estate_id` int(11) NOT NULL,
                            PRIMARY KEY (`id`),
                            KEY `real_estate_id` (`real_estate_id`),
                            KEY `author_id` (`user_id`),
                            CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`real_estate_id`) REFERENCES `real_estate` (`id`),
                            CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE comments CONVERT TO CHARACTER SET utf8;
--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
                          `id` int(11) NOT NULL AUTO_INCREMENT,
                          `img_src` varchar(255) DEFAULT NULL,
                          `real_estate_id` int(11) NOT NULL,
                          PRIMARY KEY (`id`),
                          KEY `real_estate_id` (`real_estate_id`),
                          CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`real_estate_id`) REFERENCES `real_estate` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `positions` (
                             `id` int(11) NOT NULL AUTO_INCREMENT,
                             `lat` double DEFAULT NULL,
                             `lng` double DEFAULT NULL,
                             PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `real_estate`
--

DROP TABLE IF EXISTS `real_estate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `real_estate` (
                               `id` int(11) NOT NULL AUTO_INCREMENT,
                               `name` varchar(255) DEFAULT NULL,
                               `price` double DEFAULT NULL,
                               `city` varchar(255) DEFAULT NULL,
                               `description` text,
                               `position_id` int(11) DEFAULT NULL,
                               `user_id` int(11) NOT NULL,
                               PRIMARY KEY (`id`),
                               KEY `position_id` (`position_id`),
                               KEY `author_id` (`user_id`),
                               CONSTRAINT `real_estate_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `positions` (`id`),
                               CONSTRAINT `real_estate_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE real_estate CONVERT TO CHARACTER SET utf8;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
                                `id` int(11) NOT NULL AUTO_INCREMENT,
                                `reservation_start` timestamp NOT NULL,
                                `reservation_end` timestamp NOT NULL,
                                `user_id` int(11) NOT NULL,
                                `real_estate_id` int(11) NOT NULL,
                                PRIMARY KEY (`id`),
                                KEY `user_id` (`user_id`),
                                KEY `real_estate_id` (`real_estate_id`),
                                CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
                                CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`real_estate_id`) REFERENCES `real_estate` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
                         `id` int(11) NOT NULL AUTO_INCREMENT,
                         `username` varchar(50) NOT NULL,
                         `password` char(68) NOT NULL,
                         `enabled` tinyint(1) NOT NULL DEFAULT (1),
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE users CONVERT TO CHARACTER SET utf8;

/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
SET FOREIGN_KEY_CHECKS=1;
-- Dump completed on 2020-01-28 13:42:37
