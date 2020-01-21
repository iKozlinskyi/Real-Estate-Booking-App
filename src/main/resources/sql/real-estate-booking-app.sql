CREATE DATABASE  IF NOT EXISTS `real-estate-booking-app`;
USE `real-estate-booking-app`;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `users`;

create table `users`(
                        id int not null AUTO_INCREMENT,
                        username varchar(50) not null,
                        password char(68) not null,
                        enabled tinyint(1) not null default (1),
                        primary key (id)
);

INSERT INTO `users`(username, password) VALUES
('Dimaa23', 'pass123'),
('Miko45', 'pass1233'),
('DLire3', 'pass123'),
('Vivika', 'pwass123'),
('Nomax', 'pass123');

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
                            `text` text DEFAULT NULL,
                            `created_at` timestamp default NOW(),
                            `author_id` int not null,
                            `real_estate_id` int NOT NULL,
                            PRIMARY KEY (`id`),
                            foreign key(`real_estate_id`) references `real_estate`(`id`),
                            foreign key(`author_id`) references `users`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `comments`(text, real_estate_id, author_id)
VALUES
('Great place, loved it', 1, 1),
('Well, I`ve seen better', 1, 2),
('Would definitely visit once more!', 1, 3),
('Price is good', 2, 4);

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
  `description` text DEFAULT NULL,
  `position_id` int DEFAULT NULL,
  `author_id` int not null,
  foreign key(`position_id`) references `positions`(`id`),
  foreign key(`author_id`) references `users`(`id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


INSERT INTO `real_estate`(name, price, city, author_id, position_id, description) VALUES
	('Great House Near Shore','27','Kyiv', 1, 1,  'ThiLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
	('Vivid Spacious Place','53', 'Lviv',1, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
	('Flat with stunning view','42','Odessa', 2, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
	('Dream house','24', 'Kyiv', 3, 4,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
	('The palace','86', 'Lviv', 2, 5,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');

SET FOREIGN_KEY_CHECKS=1;
