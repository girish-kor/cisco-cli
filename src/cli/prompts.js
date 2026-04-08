'use strict';
const inquirer = require('inquirer');
const { validateIP, validateInterface, validateVlanId } = require('../utils/validator');

async function askIP(message) {
  const { value } = await inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message,
      validate: (v) => (validateIP(v) ? true : 'Invalid IP address (e.g. 192.168.1.1)')
    }
  ]);
  return value;
}

async function askMask(message) {
  const { value } = await inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message,
      validate: (v) => (validateIP(v) ? true : 'Invalid subnet mask (e.g. 255.255.255.0)')
    }
  ]);
  return value;
}

async function askInterface(message) {
  const { value } = await inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message: message || 'Interface (e.g. GigabitEthernet0/0):',
      validate: (v) => (validateInterface(v) ? true : 'Invalid interface name')
    }
  ]);
  return value;
}

async function askVlanId(message) {
  const { value } = await inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message: message || 'VLAN ID (1-4094):',
      validate: (v) => (validateVlanId(v) ? true : 'Invalid VLAN ID (1–4094)')
    }
  ]);
  return parseInt(value, 10);
}

async function askText(message) {
  const { value } = await inquirer.prompt([{ type: 'input', name: 'value', message }]);
  return value;
}

async function askConfirm(message) {
  const { value } = await inquirer.prompt([{ type: 'confirm', name: 'value', message }]);
  return value;
}

async function askChoice(message, choices) {
  const { value } = await inquirer.prompt([
    {
      type: 'list',
      name: 'value',
      message,
      choices
    }
  ]);
  return value;
}

module.exports = { askIP, askMask, askInterface, askVlanId, askText, askConfirm, askChoice };
