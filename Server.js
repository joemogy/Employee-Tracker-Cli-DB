//Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const { Table } = require('console-table-printer');
const figlet = require('figlet');
const chalk = require('chalk');

const welcomeLogo = () => {
  console.log(chalk.green(figlet.textSync('\nEmployee \nManagement \nSystem', { font: 'standard', horizontalLayout: 'default', width: 80 })));
};
welcomeLogo();

//Establish connection to employee database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'employee_trackerdb',
});

//Initiate connection to employee database
connection.connect((err) => {
  if (err) throw err;
  mainMenu();
});

//A function that will validate prompts needing a string
const validateString = string => {
  return string !== '' || 'This information is required.';
};

//A function that will validate prompts needing a number
const validateNumber = number => {
  const reg = /^\d+$/;
  return reg.test(number) || "Please enter a number.";
};

//---------------------------------//

//Begin main menu function
const mainMenu = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'Add department, role, or employee',
          'View department, role, or employee',
          'Update employee role',
          'Exit',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'Add department, role, or employee':
            addData();
            break;
  
          case 'View department, role, or employee':
            viewData();
            break;
  
          case 'Update employee role':
            beginRoleUpdate();
            break;
  
          case 'Exit':
            connection.end();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      })
    
        
};

//---------------------------------//

//Submenu to ask to add data by department, role, or employee
const addData = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to add?',
      choices: [
        'Department',
        'Role',
        'Employee',
        'Return to main menu',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Department':
          addDepartment();
          break;

        case 'Role':
          queryDeptsForAddRole();
          break;

        case 'Employee':
          beginAddEmployee();
          break;

        case 'Return to main menu':
          mainMenu();
          break;

        case 'Exit':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    })   
};

//Add a department to the database
const addDepartment = () => {
  inquirer
      .prompt([
          {
          type: 'input',
          name: 'dept',
          message: "Please input the department:",
          validate: validateString,
          },
          
      ])
      .then((data) => {
       const query = "INSERT INTO department SET ?";
       connection.query(query, {dept_name: `${data.dept}`}, (err, res) => {
        if(err) throw(err);
        console.log(`You have added the ${data.dept} department to the database.`);
        mainMenu();
       }) 
    });
};

//Query the department table for the add role function
const queryDeptsForAddRole = () => {
  connection.query('SELECT * FROM department ORDER BY dept_name', (err, res) => {
      if (err) throw err;
      let deptArray = [];
      res.forEach(({id, dept_name}) => {
        deptArray.push(`${id} ${dept_name}`);
      })
      addRole(deptArray);  
    });
};

//Add a role to the database
const addRole = (dept) => {
  
  inquirer
      .prompt([
          {
          type: 'input',
          name: 'title',
          message: "Please input the title of this role:",
          validate: validateString,
          },

          {
            type: 'input',
            name: 'salary',
            message: "Please input the salary of this role:",
            validate: validateNumber,
          },

          {
            type: 'list',
            name: 'dept',
            message: "Please add a department for this role:",
            choices: [...dept],
          },
          
      ])
      .then((data) => {
        const deptKeySplit = data.dept.split(' ');
        const deptKey = deptKeySplit[0];
        const deptName = deptKeySplit[1];
        const query = "INSERT INTO role SET ?";
        connection.query(query, {title: `${data.title}`, salary: `${data.salary}`, dept_id: `${deptKey}`}, (err, res) => {
          if(err) throw(err);
        const p = new Table();
        p.addRow({ Title: `${data.title}`, Salary: `${data.salary}`, Department: `${deptName}` });
        p.printTable();
        mainMenu();
       }) 
    });
};

//Initiate addEmployee by first query of roles
const beginAddEmployee = () => {
  connection.query('SELECT * FROM role ORDER BY title', (err, res) => {
      if (err) throw err;
      let roleArray = [];
      res.forEach(({id, title}) => {
        roleArray.push(`${id} ${title}`);
      })
      queryManagersForAddEmployee(roleArray);  
    });
};

//Query managers for the addEmployee function
const queryManagersForAddEmployee = roles => {
  connection.query('SELECT * FROM employee WHERE manager_id IS NULL ORDER BY last_name', (err, res) => {
    if (err) throw err;
    let managerArray = [];
    res.forEach(({employee_id, first_name, last_name}) => {
      managerArray.push(`${employee_id} ${first_name} ${last_name}`);
    })
    addEmployee(roles, managerArray);  
  });
}

//Add employee who has a manager to database
const addEmployee = (role, manager) => {
  inquirer
  .prompt([
      {
      type: 'input',
      name: 'fname',
      message: "Please enter the first name of the employee:",
      validate: validateString,
      },

      {
        type: 'input',
        name: 'lname',
        message: "Please enter the last name of the employee:",
        validate: validateString,
      },

      {
        type: 'list',
        name: 'role',
        message: "Please select a role for this employee:",
        choices: [...role],
      
      },

      {
        type: 'list',
        name: 'manager',
        message: "Please select a manager for this employee:",
        choices: [...manager, 'This employee is a manager'],
        
      },
      
  ])
      .then((data) => {
        if(data.manager === 'This employee is a manager') {
          addManagerAsEmployee(data);
          return;    
        }
        const roleSplit = data.role.split(' ');
        const managerSplit = data.manager.split(' ');
        const roleKey = roleSplit[0];
        const managerKey = managerSplit[0];
        
        const query = "INSERT INTO employee SET ?";
        connection.query(query, {first_name: `${data.fname}`, last_name: `${data.lname}`, role_id: `${roleKey}`, manager_id: `${managerKey}`}, (err, res) => {
          if(err) throw(err);
        allEmployees();
        mainMenu();
      }) 
  });
};

//Add employee who is already a manger to database
const addManagerAsEmployee = managerData => {
  const roleSplit = managerData.role.split(' ');
  const roleKey = roleSplit[0];
  const query = "INSERT INTO employee SET ?";
  connection.query(query, {first_name: `${managerData.fname}`, last_name: `${managerData.lname}`, role_id: `${roleKey}`,}, (err, res) => {
    if(err) throw(err);
  allEmployees();
  mainMenu();
}) 
};

//---------------------------------//

//Submenu to view employee data
const viewData = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to view?',
      choices: [
        'All Employees',
        'Roles',
        'Departments',
        'Return to main menu',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'All Employees':
          allEmployees();
          break;

        case 'Roles':
          viewRoles();
          break;

        case 'Departments':
          viewDepts();
          break;

        case 'Return to main menu':
          mainMenu();
          break;

        case 'Exit':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    })   
};

//View all employees
const allEmployees = () => {
  const query = "SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.dept_id = department.id ORDER BY employee.last_name";
  connection.query(query, (err, res) => {
    if (err) throw(err);
    const p = new Table();
    res.forEach(({  employee_id, first_name, last_name, title, salary, dept_name}) => {
          p.addRow({ Employee_ID: `${employee_id}`, First_Name: `${first_name}`, Last_Name: `${last_name}`, Title: `${title}`, Salary: `${salary}`, Department: `${dept_name}` });
        
        });
        p.printTable();
        mainMenu();
  });
  
};

//View departments
const viewDepts = () => {
  connection.query('SELECT * FROM department ORDER BY dept_name', (err, res) => {
      if (err) throw err;
      const p = new Table();
      res.forEach(({dept_name}) => {
        p.addRow({Department: `${dept_name}`});
      });
      p.printTable();
        mainMenu();  
    });
};

//View Roles
const viewRoles = () => {
  connection.query('SELECT * FROM role ORDER BY title', (err, res) => {
    if (err) throw err;
    const p = new Table();
    res.forEach(({title, salary}) => {
      p.addRow({Title: `${title}`, Salary: `${salary}`});
    });
    p.printTable();
      mainMenu();  
  });
}

//---------------------------------//

//Initiate updateEmployeeRole by query of employees
const beginRoleUpdate = () => {
  
  connection.query('SELECT * FROM employee ORDER BY last_name', (err, res) => {
    if (err) throw err;
    let nameArray = [];
    res.forEach(({employee_id, first_name, last_name, role_id}) => {
      nameArray.push(`${first_name} ${last_name} ${employee_id} ${role_id}`);
    })
    queryRoles(nameArray);  
  });
  
};

//Query roles for updateEmployeeRole function
const queryRoles = (names) => {
  connection.query('SELECT * FROM role ORDER BY title', (err, res) => {
    if (err) throw err;
    let roleArray = [];
    res.forEach(({id, title}) => {
      roleArray.push(`${id} ${title}`);
    })
    updateEmployeeRole(names, roleArray);  
  });
};

//Update the employee role
const updateEmployeeRole = (names, roles) => {
  
  inquirer
      .prompt([
          {
          type: 'list',
          name: 'name',
          message: "Please select a name:",
          choices: [...names],
          
          },

          {
            type: 'list',
            name: 'role',
            message: "Please select a role:",
            choices: [...roles],
            
            },
          
      ])
      .then((data) => {
        const nameSplit = data.name.split(' ');
        const roleSplit = data.role.split(' ');;
        const employeeKey = nameSplit[2];
        const roleKey = roleSplit[0];
       const query = "UPDATE employee SET ? WHERE ?";
       connection.query(query, [{role_id: `${roleKey}`}, {employee_id: `${employeeKey}`}], (err, res) => {
        if(err) throw(err);
        allEmployees();
        mainMenu();
       }) 
    });

};
