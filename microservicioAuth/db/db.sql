
-- Comprobar si existe la base de datos y eliminarla si es necesario
DROP DATABASE IF EXISTS BookMyEvent;

-- Crear la base de datos BookMyEvent
CREATE DATABASE BookMyEvent;

-- Usar la base de datos BookMyEvent
USE BookMyEvent;

-- Comprobar si existe la tabla user y eliminarla si es necesario
DROP TABLE IF EXISTS user;

-- Crear la tabla user
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Comprobar si existe la tabla favoriteEvents y eliminarla si es necesario
DROP TABLE IF EXISTS favoriteEvents;

-- Crear la tabla favoriteEvents
CREATE TABLE favoriteEvents (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(45) NOT NULL,
    roadID VARCHAR(45) NOT NULL
);
