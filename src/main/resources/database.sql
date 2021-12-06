/*
DATABASE DDL TO CREATE DATABASE,USER AND PRIVILIGES
FOR USER european_leagues
(root user permissions required to launch this file)
*/

CREATE DATABASE IF NOT EXISTS european_leagues CHARACTER SET utf8;

-- et the password policy level lower(the user user can adjust this as desired)

SET GLOBAL validate_password_policy=LOW;

CREATE USER 'european_leagues'@'%' IDENTIFIED BY 'european_leagues';
GRANT ALl ON european_leagues .* TO'european_leagues'@'%';