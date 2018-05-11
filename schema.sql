CREATE DATABASE horus_users;

USE horus_users;

CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `first_name` VARCHAR (100) COLLATE utf8_unicode_ci NOT NULL,
 `last_name` VARCHAR (100) COLLATE utf8_unicode_ci NOT NULL,
 `email` VARCHAR (100) COLLATE utf8_unicode_ci NOT NULL,
 `password` VARCHAR (255) COLLATE utf8_unicode_ci NOT NULL,
 `created` datetime NOT NULL,
 `modified` datetime NOT NULL,
 PRIMARY KEY (`id`)
)
--  ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;