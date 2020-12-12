const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamInput = [];

//Manager information template
function ManagerInfo() {
    
        return inquirer.prompt([{
            type: "input",
            message: "Enter Manager's name",
            name: "name",
        }, {
            type: "input",
            message: "Enter Manager's ID?",
            name: "id",
        }, {
            type: "input",
            message: "Enter manager's email?",
            name: "email",
        }, {
            type: "input",
            message: "Enter manager's number?",
            name: "officeNumber",
        }]).then((managerInput) => {
    
            const newManager = new Manager(managerInput.name, managerInput.id, managerInput.email, managerInput.officeNumber);
            employeeList.push(newManager);
            ManagerInfo();
    
        });
    
    }
    