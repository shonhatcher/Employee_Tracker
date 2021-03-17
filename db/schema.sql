DROP DATABASE IF EXISTS company_DB;
CREATE DATABASE company_DB;

USE company_DB;

CREATE TABLE department (
 id INT NOT NULL AUTO_INCREMENT,
 dept_name VARCHAR(30) NOT NULL,
 CONSTRAINT unique_name UNIQUE(dept_name),
 PRIMARY KEY (id)
);

CREATE TABLE employee_role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INTEGER NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department (id),
CONSTRAINT unique_role UNIQUE (title)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES employee_role (id),
  FOREIGN KEY (manager_id) REFERENCES employee (id)
 
);