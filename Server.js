const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mangekyou1$',
    database: 'Employee_db'
});

const tableData = () => {
    return inquirer.prompt([{
        type: 'list',
        name: 'EmployeeDataOptions',
        message: 'Employee Data',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee'],
        validate: EmployeeDataOptions => {
            if (EmployeeDataOptions) {
                return true;
            } else {
                false;
                return console.log('Select a Valid Option');

            }
        }
    }])
        .then(data => {
            switch (data.choices) {
                case "View All Departments":
                    viewAllDepartments()
                    break;

                case "View All roles":
                    viewAllRoles()
                    break;

                case "View All Employees":
                    viewAllEmployees()
                    break;
            }
        })
}


tableData();

const viewAllDepartments = function viewDepartment() {
    connection.query('SELECT * FROM Department', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.table(result);
            tableData();
        }
    })
}

const viewAllRoles = function viewRoles() {
    connection.query('SELECT * FROM Department', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.table(result);
            tableData();
        }
    })
}

const viewAllEmployees = function ViewEmployees() {
    connection.query('SELECT * FROM Department', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.table(result);
            tableData();
        }
    })
}

// connection.query('SELECT * FROM Department',(err,result)=>{
//     console.table(result);
// });

// connection.query('SELECT * FROM Roles', (err,result)=>{
//     console.table(result);
// });

// connection.query('SELECT * FROM Employee', (err,result)=>{
//     console.table(result);
// });