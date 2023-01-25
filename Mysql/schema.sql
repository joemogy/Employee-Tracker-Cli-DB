DROP DATABASE IF EXISTS Employee_db;
CREATE DATABASE Employee_db;

USE Employee_db;

CREATE TABLE Department (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Department_name VARCHAR(30) NOT NULL
);
SELECT * FROM Department;

CREATE TABLE Roles (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(30) NOT NULL,
    Salary INT NOT NULL,
    Department_id INT,
    FOREIGN KEY(Department_id) REFERENCES Department(Id)
);

SELECT * FROM Roles;

CREATE TABLE Employee (
    Id INT NOT NULL PRIMARY KEY,
    First_name VARCHAR(30) NOT NULL,
    Last_name VARCHAR(30) NOT NULL,
    Role_id INT NOT NULL, AUTO_INCREMENT
    FOREIGN KEY (Role_id) REFRENCES Roles(Id),
    Manager_id INT NULL
);
SELECT * FROM Department;