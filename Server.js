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
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update An Employee Role', 'Exit'],
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
            console.log(data.EmployeeDataOptions)
            switch (data.EmployeeDataOptions) {
                case "View All Departments":
                    viewAllDepartments()
                    break;

                case "View All Roles":

                    console.log('called function above')
                    viewAllRoles()
                    break;

                case "View All Employees":
                    viewAllEmployees()
                    break;

                case "Add a Department":
                    addDepartment();
                    break;

                case "Add a Role":
                    addRole()
                    break;

                case "Add an Employee":
                    addEmployee()
                    break;

                case "Update An Employee Role":
                    updateEmployeeRole()
                    break;

                case 'Exit':
                    exit()
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
    connection.query('SELECT * FROM Roles', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.table(result);
            tableData();
        }
    })
}

const viewAllEmployees = function ViewEmployees() {
    connection.query('SELECT * FROM Employee', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.table(result);
            tableData();
        }
    })
}

const addDepartment = () => {

    return inquirer.prompt([{
        type: 'input',
        name: 'addDepartment',
        message: 'Add Name of the The Department',
        validate: addDepartment => {
            if (addDepartment) {
                return true;
            } else {
                console.log("Add a department");
                return false;
            }
        }
    }])
        .then(add => {
            console.log(add)
            connection.query('INSERT INTO Department(Department_name) VALUES(?)', [add.addDepartment], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.table(result);
                }
            })
            tableData();
        })


}

const addRole = () => {
    return inquirer.prompt([{
        type: 'input',
        name: 'roleName',
        message: 'Please eneter the name of the role',
        validate: addRoleName => {
            if (addRoleName) {
                return true;
            } else {
                console.log("Add a Role Name");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Please eneter the Salary',
        validate: addRoleSalary => {
            if (addRoleSalary) {
                return true;
            } else {
                console.log("Add a Salary");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'departmentId',
        message: 'Please enter the Id of the Department',
        validate: addRoleDepartmentId => {
            if (addRoleDepartmentId) {
                return true;
            } else {
                console.log("Add a Department Id");
                return false;
            }
        }
    }
    ])
        .then(add => {
            connection.query('INSERT INTO Roles(Title,Salary,Department_id) VALUES(?,?,?)', [add.roleName, add.salary, add.departmentId], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.table(result);
                }
            })
            tableData();
        })
}

const addEmployee = () => {
    return inquirer.prompt([{
        type: 'input',
        name: 'firstName',
        message: 'Please eneter the First name of the Employee',
        validate: addFirstName => {
            if (addFirstName) {
                return true;
            } else {
                console.log("Add a Employee First Name");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Please eneter the Last name of the Employee',
        validate: addLastName => {
            if (addLastName) {
                return true;
            } else {
                console.log("Add a Employee Last Name");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'roleId',
        message: 'Please eneter the role Id of the Employee',
        validate: addroleId => {
            if (addroleId) {
                return true;
            } else {
                console.log("Add a Role Id");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'managerId',
        message: 'Please eneter the ManagerId',
        validate: addManagaeId => {
            if (addManagaeId) {
                return true;
            } else {
                console.log("Add a Manager Id");
                return false;
            }
        }
    }
    ])
        .then(add => {
            connection.query('INSERT INTO Employee(First_name,Last_name,Role_id,Manager_id) VALUES(?,?,?,?)', [add.firstName, add.lastName, add.roleId, add.managerId], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.table(result);
                }
            })
            tableData();
        })
}

const updateEmployeeRole = () => {
    return inquirer.prompt([{
        type: 'input',
        name: 'employeeFirstName',
        message: 'Please eneter the First Name'

    },
    {
        type: 'input',
        name: 'employeeRoleId',
        message: 'Please eneter the new Role Id'

    }
    ])
        .then(update => {
            connection.query('UPDATE Employee SET Role_id=? WHERE First_name=?', [update.employeeRoleId, update.employeeFirstName], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.table();
                }
            })
            tableData();
        })

}

const exit = () => {
    return inquirer.prompt([{
        type: 'confirm',
        name: 'exit',
        message: "Would you like to exit",
        default: true
    }])
        .then(exitNow => {
            if (exitNow.exit === true) {
                console.log('Thank You');
            } else {
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