'use strict';
const ora = require('ora');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { state, log } = require('../utils/state');
const logger = require('../utils/logger');
const { askIP, askText, askChoice } = require('../cli/prompts');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function addAcl() {
  const type = await askChoice('ACL type:', ['standard', 'extended']);
  const { aclNum } = await inquirer.prompt([
    {
      type: 'input',
      name: 'aclNum',
      message: 'ACL number:',
      validate: (v) => (/^\d+$/.test(v) ? true : 'Must be numeric')
    }
  ]);
  const action = await askChoice('Action:', ['permit', 'deny']);
  const src = await askIP('Source IP:');
  let dst = null;
  if (type === 'extended') {
    dst = await askIP('Destination IP:');
  }
  state.acls.push({ type, aclNum, action, src, dst });
  const sp = ora('Applying ACL...').start();
  await sleep(300);
  sp.stop();
  logger.success(`ACL ${aclNum}: ${action} ${src}${dst ? ' → ' + dst : ''}`);
  log(`access-list ${aclNum} ${action} ${src}`);
}

async function showAcls() {
  const sp = ora('Loading ACLs...').start();
  await sleep(250);
  sp.stop();
  logger.blank();
  if (state.acls.length === 0) {
    console.log(chalk.gray('  No ACLs configured.'));
  } else {
    for (const a of state.acls) {
      const dst = a.dst ? ` → ${a.dst}` : '';
      console.log(
        `  ${chalk.cyan(a.type.padEnd(10))} ${a.aclNum.padEnd(6)} ${a.action.padEnd(8)} ${a.src}${dst}`
      );
    }
  }
  logger.blank();
}

async function enableSsh() {
  state.sshEnabled = true;
  const sp = ora('Enabling SSH...').start();
  await sleep(350);
  sp.stop();
  logger.success('SSH enabled on VTY lines 0–4 (RSA key simulated).');
  log('ip ssh version 2; line vty 0 4 transport input ssh');
}

async function addUser() {
  const username = await askText('Username:');
  const { privilege } = await inquirer.prompt([
    {
      type: 'input',
      name: 'privilege',
      message: 'Privilege level (0-15):',
      validate: (v) => {
        const n = parseInt(v, 10);
        return !isNaN(n) && n >= 0 && n <= 15 ? true : 'Must be 0–15';
      }
    }
  ]);
  state.users.push({ username, privilege: parseInt(privilege, 10) });
  logger.success(`User '${username}' added with privilege ${privilege}.`);
  log(`username ${username} privilege ${privilege}`);
}

async function showUsers() {
  logger.blank();
  if (state.users.length === 0) {
    console.log(chalk.gray('  No users configured.'));
  } else {
    console.log(`  ${'Username'.padEnd(20)}Privilege`);
    console.log(`  ${'─'.repeat(30)}`);
    for (const u of state.users) {
      console.log(`  ${u.username.padEnd(20)}${u.privilege}`);
    }
  }
  logger.blank();
}

module.exports = { addAcl, showAcls, enableSsh, addUser, showUsers };
