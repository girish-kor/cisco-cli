'use strict';
const inquirer = require('inquirer');
const chalk = require('chalk');
const runner = require('./runner');

const CATEGORIES = [
  { name: 'Device Management', value: 'device' },
  { name: 'Interfaces', value: 'interfaces' },
  { name: 'Routing', value: 'routing' },
  { name: 'Switching', value: 'switching' },
  { name: 'Security', value: 'security' },
  { name: 'Monitoring', value: 'monitoring' },
  { name: 'QoS / Services', value: 'qos' },
  new inquirer.Separator(),
  { name: chalk.red('Exit'), value: 'exit' }
];

async function mainMenu() {
  const { category } = await inquirer.prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Select category:',
      choices: CATEGORIES,
      pageSize: 10
    }
  ]);
  if (category === 'exit') {
    return false;
  }
  await runner.run(category);
  return true;
}

module.exports = { mainMenu };
