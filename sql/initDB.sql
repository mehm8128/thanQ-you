DROP DATABASE IF EXISTS thanQ_you;
CREATE DATABASE ThanQ_you;
USE ThanQ_you;

CREATE TABLE IF NOT EXISTS `users` (
  `name` varchar(36) NOT NULL UNIQUE,
  `unread_count` int(8) NOT NULL,
  `total_thank` int(8) NOT NULL,
  `total_thanked` int(8) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `teas` (
  `id` char(36) NOT NULL UNIQUE,
  `count` int(8) NOT NULL,
  `message` varchar(140) NOT NULL,
  `from` varchar(36) NOT NULL,
  `to` varchar(36) NOT NULL,
  `unread` boolean NOT NUll ,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`from`) REFERENCES users(`name`),
  FOREIGN KEY (`to`) REFERENCES users(`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
