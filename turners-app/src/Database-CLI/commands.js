#!/usr/bin/env node

const program = require('commander');
//const { prompt } = require('inquirer');



const {
    addCar,
    listCar,
    removeCar
  } = require('./index');


// Add Command
program
  .command('add')
  .alias('a')
  .description('Add a customer')
  .action(async () => {

    console.info('Done Only By Admin!')
    const { default: inquirer } = await import('inquirer');
    
    const questions = [
      {
        type: 'input',
        name: 'Make',
        message: 'Car Make'
      },
      {
        type: 'input',
        name: 'Model',
        message: 'Car Model'
      },
      {
        type: 'input',
        name: 'Type',
        message: 'Car Type'
      }
    ];

    inquirer.prompt(questions).then(answers => addCar(answers));
  });

// List Command
program
.command('list')
.alias('l')
.description('List all customers')
.action(() => listCar());

// Remove Command
program
  .command('remove <_id>')
  .alias('r')
  .description('Removes Car Frome Inventory')
  .action(_id => removeCar(_id));



program.parse(process.argv);


//turners-cli <cmnd> to get started