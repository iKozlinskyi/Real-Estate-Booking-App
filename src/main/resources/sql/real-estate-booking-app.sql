CREATE DATABASE  IF NOT EXISTS `real-estate-booking-app`;
USE `real-estate-booking-app`;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `positions`;

CREATE TABLE `positions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `positions`(lat, lng) VALUES
	('50.452339', '30.502709'),
    ('50.425209', '30.498965'),
    ('50.435277', '30.549913'),
    ('50.405277', '30.589913'),
    ('50.642778', '30.279913');

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `author` varchar(255) default null,
                            `text` text DEFAULT NULL,
                            `created_at` timestamp default NOW(),
                            `real_estate_id` int NOT NULL,
                            PRIMARY KEY (`id`),
                            foreign key(`real_estate_id`) references `real_estate`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `comments`(author, text, real_estate_id)
VALUES
('John81', 'Great place, loved it', 1),
('Limaso323', 'Well, I`ve seen better', 1),
('PotatoHead', 'Would definitely visit once more!', 1),
('Mannam', 'Price is good', 2);

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `img_src` varchar(255) default null,
                            `real_estate_id` int NOT NULL,
                            PRIMARY KEY (`id`),
                            foreign key(`real_estate_id`) references `real_estate`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `photos`(img_src, real_estate_id)
VALUES
('https://a0.muscache.com/im/pictures/bd544e3f-31f3-4d17-a339-373620b4037a.jpg?aki_policy=xx_large', 1),
('https://a0.muscache.com/im/pictures/dc0c8a1f-19fd-4f29-bea2-15246186ed12.jpg?aki_policy=xx_large', 1),
('https://a0.muscache.com/im/pictures/f4751e1b-9869-4c9d-814f-38d4771f9ccb.jpg?aki_policy=xx_large', 1),
('https://a0.muscache.com/im/pictures/a73f25a4-0e1d-4cd6-898e-144edd2cf2cf.jpg?aki_policy=xx_large', 1),
('https://a0.muscache.com/im/pictures/18812907/6da085bc_original.jpg?aki_policy=xx_large', 2);


DROP TABLE IF EXISTS `real_estate`;

CREATE TABLE `real_estate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `city` varchar(255) default null,
  `author` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `position_id` int DEFAULT NULL,
  foreign key(`position_id`) references `positions`(`id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


INSERT INTO `real_estate`(name, price, city, author, position_id, description) VALUES
	('Great House Near Shore','27','Kyiv', 'Michael5', 1,  'ThiLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
	('Vivid Spacious Place','53', 'Lviv','JohnDonn', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
	('Flat with stunning view','42','Odessa', 'PotatoHeead', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
	('Dream house','24', 'Kyiv', 'Blooobie', 4,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
	('The palace','86', 'Lviv', 'juandandan', 5,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');

SET FOREIGN_KEY_CHECKS=1;
