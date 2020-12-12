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
function managerInfo() {
    
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
        message: "Enter Manager's email?",
        name: "email",
    }, {
        type: "input",
        message: "Enter Manager's number?",
        name: "officeNumber",
    }]).then((managerInput) => {

        const newManager = new Manager(managerInput.name, managerInput.id, managerInput.email, managerInput.officeNumber);
        teamInput.push(newManager);
        employeeInput();

    });

}


// Starting page
function employeeInput() {

    return inquirer.prompt([{
        type: "list",
        name: "addEmployee",
        message: "Which type of employee would you like to add?",
        choices: [{ name: "Engineer", value: 0 }, { name: "Intern", value: 1 }, { name: "Manager", value: 2 }, { name: "I don't want to add any more team members", value: 3 }],
    }]).then((employeeType) => {
        //if they selected engineer, ask engineer questions
        if (employeeType.newEmployee === 0) {
            engineerInfo();
            //else, ask Intern questions
        } else if (employeeType.newEmployee === 1) {
            internInfo();
            // else, ask Manager questions
        } else if (employeeType.newEmployee === 2) {
            managerInfo();
            //exit application
        } else {
            createHtmlFile();
        }
    });
}

    function createHtmlFile() {

        const employeeTeamPage = render(teamInput);
    
        fs.writeFile("output.html", employeeTeamPage, (err) => {
            if (err) console.log("Unable to write file");
            else console.log("File was written successfully");
        });
    
    }

    managerInfo();