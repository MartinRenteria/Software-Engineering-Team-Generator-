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
        message: "Enter Manager's ID",
        name: "id",
    }, {
        type: "input",
        message: "Enter Manager's email",
        name: "email",
    }, {
        type: "input",
        message: "Enter Manager's number",
        name: "officeNumber",
    }]).then((internInput) => {

        const newManager = new Manager(internInput.name, internInput.id, internInput.email, internInput.officeNumber);
        teamInput.push(newManager);
        employeeInput();

    });

}

// Employee options
function employeeInput() {

    return inquirer.prompt([{
        type: "list",
        name: "addEmployee",
        message: "Which type of employee would you like to add?",
        choices: [{ name: "Engineer", value: 0 }, { name: "Intern", value: 1 }, { name: "I don't want to add any more team members", value: 2 }],
    }]).then((employeeType) => {
        //if they selected engineer, ask engineer questions
        if (employeeType.addEmployee === 0) {
            engineerInfo();
            //else, ask Intern questions
        } else if (employeeType.addEmployee === 1) {
            internInfo();
            // else, ask Manager questions
        }  else {
            createHtmlFile();
        }
    });
}

//Engineer information template
function engineerInfo() {
    
    return inquirer.prompt([{
        type: "input",
        message: "Enter Engineer's name",
        name: "name",
    }, {
        type: "input",
        message: "Enter Engineer's ID",
        name: "id",
    }, {
        type: "input",
        message: "Enter Engineer's email",
        name: "email",
    }, {
        type: "input",
        message: "Enter Engineer's GitHub username",
        name: "gitHub",
    }]).then((internInput) => {

        const newEngineer = new Engineer(internInput.name, internInput.id, internInput.email, internInput.officeNumber);
        teamInput.push(newEngineer);
        employeeInput();

    });

}

//Engineer information template
function internInfo() {
    
    return inquirer.prompt([{
        type: "input",
        message: "Enter Intern's name",
        name: "name",
    }, {
        type: "input",
        message: "Enter Intern's ID",
        name: "id",
    }, {
        type: "input",
        message: "Enter Intern's email",
        name: "email",
    }, {
        type: "input",
        message: "Enter Intern's GitHub username",
        name: "gitHub",
    }]).then((internInput) => {

        const newIntern = new Intern(internInput.name, internInput.id, internInput.email, internInput.officeNumber);
        teamInput.push(newIntern);
        employeeInput();

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