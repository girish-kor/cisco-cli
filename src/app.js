'use strict';
const chalk = require('chalk');
const { mainMenu } = require('./cli/menu');

async function start() {
  console.clear();
  console.log(chalk.cyan.bold('\n  Cisco CLI Simulator'));
  console.log(chalk.gray('  ─────────────────────────────\n'));
  let running = true;
  while (running) {
    running = await mainMenu();
  }
  console.log(chalk.gray('\n  Session ended.\n'));
  process.exit(0);
}

module.exports = { start };
