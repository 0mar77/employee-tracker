// Imports all the packages needed
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const consoleTable = require('console.table');

// Creates a connection to mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'employeetracker_db'
    }
)

// Contains menu options
const homeMenu = [
    {
        type: 'list',
        name: 'homeMenu',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
    }
]

// Contains questions to create a new department
const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new department?'
    }
]

// Contains questions to create a new role
const addRoleQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the name of the new role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the role\'s salary?'
    },
    {
        type: 'input',
        name: 'department_id',
        message: 'What department ID does this role belong to?'
    },
]

// Contains questions to create a new employee
const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'first_name',
        message: 'What is the new employee\'s first name?'
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'What is the new employee\'s last name?'
    },
    {
        type: 'input',
        name: 'role_id',
        message: 'What is the role ID?'
    },
    {
        type: 'input',
        name: 'manager_id',
        message: 'What is the manager\'s ID?'
    }
]

// funtion will query mysql tables to get data and crete a table in the terminal
function getTableInfo(table) {
    db.query(`SELECT * FROM ${table}`, (err, results) => {
        if(err) { console.log(err) };
        console.table(results)
    })
};

// Will create a new department
function createDepartment(data) {
    const newDepartment = [data];
    db.query(`INSERT INTO department (name) VALUES (?)`, newDepartment, (err) => {
        if(err) { console.log(err) }
    })
}

// Will create a new role
function getRoleInfo(data) {
    const newRole = [data.title, data.salary, data.department_id];
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, newRole, (err) => {
        if(err) { console.log(err) }
    })
}

// Will create a new employee
function getEmployeeInfo(data) {
    const newEmployee = [data.first_name, data.last_name, data.role_id, data.manager_id];
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, newEmployee, (err) =>{
        if(err) { console.log(err) }
    })
}

function getAllEmployees() {
    db.query(`SELECT first_name FROM employee`, (err, results) => {
        if(err) {console.log(err)};
        const employees = results.map(result => result.first_name)
        console.log(employees)
    })
}

// Command line interface
class CLI {

    // function that starts the app
    start() {
        
        // Creates the main menu
        inquirer
        .prompt(homeMenu)
        .then((data) => {
            
            // View all departments
            if(data.homeMenu === 'View All Departments') {
               
                getTableInfo('department');
                this.start();

            } else if(data.homeMenu === 'View All Roles') {
                // View all roles
                getTableInfo('role');
                this.start();

            } else if(data.homeMenu === 'View All Employees') {
                // View all employees
                getTableInfo('employee');
                this.start();
                
            } else if(data.homeMenu === 'Add A Department') {
                // Creates new department
                inquirer
                .prompt(addDepartmentQuestions)
                .then((data) => {
                    createDepartment(data.name);  
                }).then(()=>{this.start()})
            } else if(data.homeMenu === 'Add A Role') {
                // Creates new role
                inquirer
                .prompt(addRoleQuestions)
                .then((data) => {
                    getRoleInfo(data);
                }).then(()=>{this.start()})
            } else if(data.homeMenu === 'Add An Employee') {
                // Creates new employee
                inquirer
                .prompt(addEmployeeQuestions)
                .then((data) => {
                    getEmployeeInfo(data);
                }).then(()=>{this.start()})
            } else if(data.homeMenu === 'Update An Employee Role') {
                getAllEmployees()
            }
        })
    }
}

// Exports cli
module.exports = CLI;