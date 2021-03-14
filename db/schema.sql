DROP DATABASE IF EXISTS company_DB;
CREATE DATABASE company_DB;

USE company_DB;

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE employee_role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
PRIMARY KEY (id)
);


CREATE TABLE department (
 id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(30),
 PRIMARY KEY (id)
);