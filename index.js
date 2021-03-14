const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { kMaxLength } = require('node:buffer');

// create the connection information for the sql database
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



// function which prompts the user for what action they should take
const start = () => {
  inquirer
    .prompt({
      name: 'addUpdateDelete',
      type: 'list',
      message: 'Would you like to add, update, or view data?',
      choices: ['Add', 'Update', 'View'],
    })
    .then((answer) => {
      // based on their answer, either call the bid or the post functions
      if (answer.addUpdateDelete === 'Add') {
        addData();
//left off here




      } else if (answer.postOrBid === 'BID') {
        bidAuction();
      } else {
        connection.end();
      }
    });
};




// function to handle posting new items up for auction
const addData = () => {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: 'addEmployeeDepartmentRole',
        type: 'list',
        message: 'Do you want to add an employee, department, or role?',
        choices: ['Add employee','Add department','Add Role'],
      },
    ])
    .then((answer) => {
        if(answer.addEmployeeDepartmentRole ==='Add employee') {
            addEmployee();
        } else if(answer.addEmployeeDepartmentRole === 'Add department'){
            addDepartment();
        }

        )
    })
//left off2

const addEmployee = () => {
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
                type: 'list',
                message: 'What is the role of the employee?',
                choices: ['Manager','Analyst','Sales Represenative','Coordinator']
            },
            {
                name: 'employeeManager',
                type: 'list',
                message: 'Who is the manager of the employee',
                choices: ['Shon','Amber'] //need to create an array of choices based on the inputs of the table
            },
            {
                name:'employeeToDoOrNo',
                type: 'list',
                message: 'Would you like to do anything else?',
                choices: ['Yes','No']
            },
        ])
        .then((answer) => {
            if(answer.employeeToDoOrNo === "Yes"){
                start();
            } else {
                connection.query (
                    {
                        first_name: answer.employeeFirstName,
                        last_name: answer.employeeLastName,
                        role_id: answer.employeeRoleID,
                        manager_id: answer.employeeManager
                    }
                )
                console.log("You have completed your database changes.")};
        })
 };

 const addDepartment = () =>{
     inquirer
        .prompt([
            {
                name: 'departmentAddition',
                type: 'list',
                message: 'What department do you want to add?',
                choices: ['Operations','Sales','Marketing','IT']
            }
        ])
        .then((answer) =>{
            connection.query(
                'INSERT INTO auctions SET ?',
                // QUESTION: What does the || 0 do?
                {
                  department: answer.departmentAddition
                },
                (err) => {
                  if (err) throw err;
                  inquirer
                    .prompt([
                        {
                            name:'employeeToDoOrNo2',
                            type: 'list',
                            message: 'Would you like to do anything else?',
                            choices: ['Yes','No']
                        },
                    ])
                    .then((answer) => {
                        if(answer.employeeToDoOrn2 === 'Yes') {
                            start();
                        } else {'Your department was created successfully!'};
                    })
                }
            )
        })
 



    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        'INSERT INTO auctions SET ?',
        // QUESTION: What does the || 0 do?
        {
          item_name: answer.item,
          category: answer.category,
          starting_bid: answer.startingBid || 0,
          highest_bid: answer.startingBid || 0,
        },
        (err) => {
          if (err) throw err;
          console.log('Your auction was created successfully!');
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
};

const bidAuction = () => {
  // query the database for all items being auctioned
  connection.query('SELECT * FROM auctions', (err, results) => {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: 'choice',
          type: 'rawlist',
          choices() {
            const choiceArray = [];
            results.forEach(({ item_name }) => {
              choiceArray.push(item_name);
            });
            return choiceArray;
          },
          message: 'What auction would you like to place a bid in?',
        },
        {
          name: 'bid',
          type: 'input',
          message: 'How much would you like to bid?',
        },
      ])
      .then((answer) => {
        // get the information of the chosen item
        let chosenItem;
        results.forEach((item) => {
          if (item.item_name === answer.choice) {
            chosenItem = item;
          }
        });

        // determine if bid was high enough
        if (chosenItem.highest_bid < parseInt(answer.bid)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            'UPDATE auctions SET ? WHERE ?',
            [
              {
                highest_bid: answer.bid,
              },
              {
                id: chosenItem.id,
              },
            ],
            (error) => {
              if (error) throw err;
              console.log('Bid placed successfully!');
              start();
            }
          );
        } else {
          // bid wasn't high enough, so apologize and start over
          console.log('Your bid was too low. Try again...');
          start();
        }
      });
  });
};

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
