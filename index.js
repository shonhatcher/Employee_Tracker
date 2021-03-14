const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'root',
  database: 'company_DB',
});

// * Add departments, roles, employees
    //Would you like to add data, update data, or view data? selection list
        //Select option -> Do you want to add an employee, department, or role?
        // selection will require table inputs 

// * View departments, roles, employees

// * Update employee roles


const start = () => {
  inquirer
    .prompt({
      name: 'addUpdateDelete',
      type: 'list',
      message: 'Would you like to add, update, or view data?',
      choices: ['Add', 'Update', 'View'],
    })
    .then((answer) => {
      if (answer.addUpdateDelete === 'Add') {
        addData();
      } else {console.log('We stil are adding to this code')
      };
    });
};

const addData = () => {
  inquirer
    .prompt([
      {
        name: 'addEmployeeDepartmentRole',
        type: 'list',
        message: 'Do you want to add an employee, department, or role?',
        choices: ['Add employee','Add department','Add Role'],
      }
    ])
    .then((answer) => {
        if(answer.addEmployeeDepartmentRole ==='Add employee') {
            addEmployee();
        } else if(answer.addEmployeeDepartmentRole === 'Add department'){
            addDepartment();
        }else {
            addRole();
        }
    });
};


const addEmployee = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'employeeFirstName',
                    type: 'input',
                    message: 'What is the first name of the employee?'
                },
                {
                    name: 'employeeLastName',
                    type: 'input',
                    message: 'What is the last name of the employee?'
                },
                {
                    name: 'employeeRoleID',
                    type: 'rawlist',
                    choices: () => {
                        const choiceArrayOne = [];
                        results.forEach(({role_id}) => {
                        choiceArrayOne.push(role_id);
                     });
                    return choiceArrayOne;
                    },
                    message: 'What is the role of the employee?',
                },
                {
                    name: 'employeeManagerID',
                    type: 'rawlist',
                    choices: () => {
                        const choiceArray = [];
                        results.forEach(({ manager_id}) => {
                        choiceArray.push(manager_id);
                     });
                    return choiceArray;
                    },
                    message: 'Who is the manager of the employee',
                },
            ])
            .then((answer) => {
                connection.query (
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.employeeFirstName,
                        last_name: answer.employeeLastName,
                        role_id: answer.employeeRoleID,
                        manager_id: answer.employeeManagerID,
                    }
                )
                askAgain();
            })
    })
}


const askAgain = () => {
    inquirer
        .prompt([
            {
                name: 'askAgain',
                type:'list',
                message: 'Would you like to do anything else?',
                choices: ['Yes','No']
            }
        ])
        .then((answer) => {
            if(answer.askAgain === 'Yes') {
                start();
            } else {
                console.log('You have completed your session.')
            }
        })
};

 const addDepartment = () =>{
     inquirer
        .prompt([
            {
                name: 'departmentAddition',
                type: 'input',
                message: 'What department do you want to add?'
            }
        ])
        .then((answer) =>{
            connection.query(
                'INSERT INTO department SET ?',
                {
                  name: answer.departmentAddition
                },
            )
            askAgain();        
        })
};

const addRole = () => {
    inquirer
        .prompt([
            {
                name: 'roleAddition',
                type: 'input',
                message: 'What role do you want to add?'
            },
            {
                name:'roleSalary',
                type: 'number',
                message: 'What is the salary?'
            }
        ])
        .then((answer) =>{
            connection.query(
                'INSERT INTO employee_role SET ?',
                {
                  title: answer.roleAddition,
                  salary: answer.roleSalary
                },
            )
            askAgain();        
        })
};

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
