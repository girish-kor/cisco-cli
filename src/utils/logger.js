'use strict';
const chalk = require('chalk');

function info(msg) {
  console.log(chalk.cyan('  ℹ  ') + msg);
}
function success(msg) {
  console.log(chalk.green('  ✔  ') + msg);
}
function warn(msg) {
  console.log(chalk.yellow('  ⚠  ') + msg);
}
function error(msg) {
  console.log(chalk.red('  ✖  ') + msg);
}
function table(data) {
  console.table(data);
}
function blank() {
  console.log();
}

module.exports = { info, success, warn, error, table, blank };
