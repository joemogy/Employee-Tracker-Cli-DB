// Importing required libraries
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

// Establishing a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db"
});

// Function to view all departments
const viewDepartments = () => {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// Function to view all roles
const viewRoles = () => {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// Function to view all employees
const viewEmployees = () => {
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// Function to add a department
const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      name: "departmentName",
      message: "What is the name of the new department?"
    })
    .then(answer => {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          name: answer.departmentName
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${answer.departmentName} department added!`);
          viewDepartments();
        }
      );
    });
};

// Function to add a role
const addRole = () => {
  connection.query("SELECT * FROM departments", (err, departments) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleTitle",
          message: "What is the title of the new role?"
        },
        {
          type: "input",
          name: "roleSalary",
          message: "What is the salary of the new role?"
        },
        {
          type: "list",
          name: "roleDepartment",
          message: "Which department does the role belong to?",
          choices: departments.map(department => department.name)
        }
      ])
      .then(answers => {
        const department = departments.find(
          department => department.name === answers.roleDepartment
        );
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answers.roleTitle,
            salary: answers.roleSalary,
            department_id: department.id
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${answers.roleTitle} role added!`);
            viewRoles();
          }
        );
      });
