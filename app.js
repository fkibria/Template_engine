const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamArray = [];
// const faizah = new Engineer("faizah", 1234, "faizah@gmail.com", "mygithub");
// console.log(faizah.getGithub());
function askQuestion() {
    inquirer.prompt([
        {
            name:"userChoice",
            type:"list",
            choices: ["Engineer", "Manager", "Intern", "buildTeam"],
            message: "What would you like to do next?"
        }
    ])
    .then(function(response){
       const userChoice = response.userChoice;
       switch(userChoice){
        case "Engineer": 
        addEngineer();
        break;
        case "Manager": 
        addManager();
        break;
        case "Intern": 
        addIntern();
        break;
        default:
        buildTeam();
       }
    })
}

function addEngineer(){
    inquirer.prompt([
        {
            name:"engineerName",
            type:"input",
            message: "What is your name?"
        },
        {
            name:"engineerId",
            type:"input",
            message: "What is your id?"
        },
        {
            name:"engineerEmail",
            type:"input",
            message: "What is your email?"
        },
        {
            name:"engineerGithub",
            type:"input",
            message: "What is your Github?"
        },
    ])
    .then(function(answers){
        const engineer= new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
        teamArray.push(engineer);
        askQuestion();
    })
}

function addManager(){
    inquirer.prompt([
        {
            name:"managerName",
            type:"input",
            message: "What is your name?"
        },
        {
            name:"managerId",
            type:"input",
            message: "What is your id?"
        },
        {
            name:"managerEmail",
            type:"input",
            message: "What is your email?"
        },
        {
            name:"managerOfficeNumber",
            type:"input",
            message: "What is your office number?"
        },
    ])
    .then(function(answers){
        const manager= new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
        teamArray.push(manager);
        askQuestion();
    })
}

function addIntern(){
    inquirer.prompt([
        {
            name:"internName",
            type:"input",
            message: "What is your name?"
        },
        {
            name:"internId",
            type:"input",
            message: "What is your id?"
        },
        {
            name:"internEmail",
            type:"input",
            message: "What is your email?"
        },
        {
            name:"internSchool",
            type:"input",
            message: "What is your school?"
        },
    ])
    .then(function(answers){
        const intern= new Intern (answers.internName, answers.internId, answers.internEmail, answers.internSchool)
        teamArray.push(intern);
        askQuestion();
    })
}

function buildTeam(){
    fs.writeFileSync(outputPath, render(teamArray), "utf-8")
}
askQuestion();

