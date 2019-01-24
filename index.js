#!/usr/bin/env node

const program = require("commander");
const { prompt, Separator } = require("inquirer");
const create = require("./create");
const fs = require("fs");
const path = require("path");

program
  .version("0.0.1")
  .description("Create Containers or Components command line tool ");

let templates = [];

fs.readdir(`${__dirname}/template`, (err, files) => {
  templates = files;

  const createQuestions = [
    {
      type: "list",
      name: "type",
      message: "Please Choose between creating a Container or a Component",
      choices: templates
    }
  ];

  const questionName = type => [
    {
      type: "input",
      name: "name",
      message: `Please give a name for your ${type}`
    }
  ];

  program
    .command("create")
    .alias("c")
    .description("Creates a Container or a Component")
    .action(() => {
      prompt(createQuestions).then(({ type }) => {
        prompt(questionName(type)).then(({ name }) => {
          create(type, name);
          console.log("type: ", type, "| name :", name);
        });
      });
    });

  program.parse(process.argv);
});
