# employee-Traker-Cli-DB
SQL Challenge: Employee Tracker.
Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS).  
A command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Description

This application allows the user to easily access the employee database and browse through the information while having command-line functionality to add and update the employee database. Through the backend development of Node and 4 packages, users can securely access all employee's data with some command-line functionality.

## Table of Contents

* User Story
* Acceptance Criteria
* Mock Up
* Getting Started & Installation
* Walkthrough
* Test
* Socials

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Mock-Up

The youtube link, attached in the following section (Getting Started & Installation) is the mockup of how the backend of the application is ran.

## Getting Started & Installation

To get started with the application,  make sure you have the latest version of Node installed.

Following the installation of Node, clone this repository to the local server to begin generating the Profile page.

Once the repository has been connected, install the following packages in the terminal:
```
npm i mysql2@2.3.3 inquirer@6.5.2 console.table@0.10.0 dotenv@16.0.3
```
After installation of the packages, in the same terminal, run the application by typing:

```
npm start
```

Make sure you have Insomnia and mySqlworkbench installed on the desktop. The following youtube link will go over how to connect to the database and run the routes.

## Walkthrough
```
https://youtu.be/YavWJomyF5Q
```

## Test

```
npm start
```

## Socials

For details regarding the specific application, proceed to the repository: [https://github.com/joemogy/employee-Traker-Cli-DB](https://github.com/joemogy/employee-Traker-Cli-DB)

For details regarding the Github profile, click on the link: https://github.com/Joemogy
