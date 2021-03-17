const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

var choiceArrayOne = [];
var choiceArray = [];

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
      } else if (answer.addUpdateDelete === 'View') {
        viewData();
      } else {
          updateData();
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
    //let query = 'SELECT employee.role_id, employee.manager_id FROM employee'
    // let query = 'SELECT employee_role.id, employee_role.title FROM employee_role ORDER BY title ASC'
        let query = 'SELECT employee.first_name, employee.last_name, employee_role.title,employee.id FROM employee Left join employee_role ON employee.role_id = employee_role.id'

    connection.query(query, (err, results) => {
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
                       // var choiceArrayOne = [];
                        results.forEach(({title}) => {
                            choiceArrayOne.push(title);                    
                        });
                    return choiceArrayOne;
                    },
                    message: 'What is the role of the employee?',
                },

               
                {
                    name: 'employeeManagerID',
                    type: 'rawlist',
                    choices: () => {
                    
                        results.forEach(({first_name}) => {
                        choiceArray.push(first_name);
                     });
                    return choiceArray;
                    },
                    message: 'Who is the manager of the employee',
                },
            ])
            .then((answer) => {

                var employeeRoleIDConverted;
                var managerIDConverted;
               //console.log(choiceArrayOne.indexOf(`${answer.employeeRoleID}`));
               employeeRoleIDConverted = choiceArrayOne.indexOf(`${answer.employeeRoleID}`);
               managerIDConverted = choiceArray.indexOf(`${answer.employeeManagerID}`);
               
                //console.log(`${answer.employeeRoleID}`);
                // let employeeID;
                // for (i = 0; i<answer.employeeRoleID.length; i++) {
                //     if(answer.employeeRoleID == choiceArrayOne) {
                //         employeeID = choiceArrayOne[i];
                //         console.log(employeeID);
                //     }
                // }
                connection.query (
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.employeeFirstName,
                        last_name: answer.employeeLastName,
                        role_id: employeeRoleIDConverted,
                        manager_id: managerIDConverted,
                      //  manager_id: answer.employeeManagerID,
                    }
                )
                askAgain();
            })
    })
}

// const employeeManagerID = () => {
//     let query = 'SELECT id, first_name,last_name, manager_id FROM employee'

//     connection.query(query, (err, results) => {
//         if (err) throw err;
//         inquirer
//             .prompt([
//                 {
//                     name: 'employeeManagerID',
//                     type: 'rawlist',
//                     choices: () => {
//                       //  const choiceArray = [];
//                         results.forEach(({first_name}) => {
//                         choiceArray.push(first_name);
//                         });
//                     return choiceArray;
//                     },
//                     message: 'Who is the manager of the employee',
//                 },
//             ])
//             .then ((answer) =>{
//                 var employeeRoleIDConvertedTwo;
//                 //console.log(choiceArray.indexOf(`${answer.employeeManagerID}`));
//                 employeeRoleIDConvertedTwo = choiceArray.indexOf(`${answer.employeeManagerID}`);
//                 connection.query (
//                     'UPDATE INTO employee SET ? WHERE ?',
//                     {
//                        manager_id: employeeRoleIDConvertedTwo,
//                        first_name: `${first_name}`, 

//                     } 
//                 )
//             });
//     });
// };    

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
                'Select * FROM department',
                //if(answer === )
                'INSERT INTO department SET ?',
                {
                  name: answer.departmentAddition
                },
            )
            askAgain();        
        })
};

const addRole = () => {
    connection.query('SELECT * FROM employee_role Inner Join department ON employee_role.department_id = department.id', (err, results) => {
        if (err) throw err;
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
            },
            {
                name: 'departmentName',
                type: 'rawlist',
                choices: () => {
                    const choiceArray = [];
                    results.forEach(({department_id}) => {
                    choiceArray.push(department_id);
                });
                
                //converts display to show words, however, need to return a numerical value

                //     results.forEach(({name}) => {
                //         if (!choiceArrayTwo.includes({name})) {
                //             choiceArrayTwo.push({name});
                //         }
                //  });
                return choiceArray;
                },
                message: 'What department is this role in?'
            }
        ])
        .then((answer) =>{
            connection.query(
                'INSERT INTO employee_role SET ?',
                {
                  title: answer.roleAddition,
                  salary: answer.roleSalary,
                  department_id: answer.departmentName
                },
            )
            askAgain();        
        })
    });
};


const viewData = () => {
    inquirer
        .prompt([
            {
                name: 'viewDataChoice',
                type: 'list',
                message: 'What data would you like to view?',
                choices: ['View Departments', 'View Roles', 'View Employees']
            }
        ])
        .then((answers) => {
            if(answers.viewDataChoice === 'View Departments') {
                viewDepartments();
            } else if (answers.viewDataChoice == 'View Roles') {
                viewRoles();
            } else {
                viewEmployees();
            }
            askAgain();
        });  
};

const viewDepartments = () => {
        let query = 'Select name FROM department'
        // Query from connection
        connection.query(query, function(err, res) {
            if(err) return err;
            console.log("\n");
            // Display query results using console.table
            console.table(res);
        });
     //   askAgain();
};

const viewRoles = () => {
    let query = 'Select title FROM employee_role'
        // Query from connection
        connection.query(query, function(err, res) {
            if(err) return err;
            console.log("\n");
            // Display query results using console.table
            console.table(res);
        });
       // askAgain();
};

const viewEmployees = () => {
    let query = 'Select employee.first_name, employee.last_name FROM employee'
    // Query from connection
    connection.query(query, function(err, res) {
        if(err) return err;
        console.log("\n");
        // Display query results using console.table
        console.table(res);
    });
}


const updateData = () =>{
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee_role.id,employee_role.department_id, department.dept_name, department.id FROM employee INNER JOIN employee_role ON employee.role_id = employee_role.id INNER JOIN department ON department.id = employee_role.department_id', 
    (err, results) => {
        if (err) throw err;
    inquirer
        .prompt([
            {
                name: 'updateDataChoice',
                type: 'rawlist',
                choices: () => {
                    const choiceArrayThree = [];
                    results.forEach(({first_name}) => {
                    choiceArrayThree.push(first_name);
                    });
                return choiceArrayThree; 
                },
                message: 'Which employee would you like to update his/her role?'
            }    
        ])
        .then((answers) => {
            connection.query(
                'UPDATE INTO department SET ?',
                {
                  dept_name: answer.UpdateDataChoice
                  
                }
            )
            askAgain();   
        })
    });
}; 




// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });


