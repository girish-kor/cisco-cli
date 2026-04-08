'use strict';
const ora = require('ora');
const chalk = require('chalk');
const { state, log } = require('../utils/state');
const logger = require('../utils/logger');
const { askIP, askMask, askInterface, askText, askVlanId } = require('../cli/prompts');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getOrCreate(name) {
  if (!state.interfaces[name]) {
    state.interfaces[name] = { ip: null, mask: null, state: 'down', description: '', vlan: null };
  }
  return state.interfaces[name];
}

async function configure() {
  const name = await askInterface('Interface to configure:');
  const ip = await askIP('IP address:');
  const mask = await askMask('Subnet mask:');
  const iface = getOrCreate(name);
  iface.ip = ip;
  iface.mask = mask;
  iface.state = 'up';
  const sp = ora(`Applying to ${name}...`).start();
  await sleep(300);
  sp.stop();
  logger.success(`${name} → ${ip}/${mask} (up)`);
  log(`interface ${name}: ip address ${ip} ${mask}`);
}

async function show() {
  const sp = ora('Fetching interface status...').start();
  await sleep(250);
  sp.stop();
  logger.blank();
  for (const [name, cfg] of Object.entries(state.interfaces)) {
    const stateColor = cfg.state === 'up' ? chalk.green(cfg.state) : chalk.red(cfg.state);
    console.log(
      `  ${chalk.white(name.padEnd(30))} ${stateColor.padEnd(10)} ${cfg.ip ? `${cfg.ip}/${cfg.mask}` : 'unassigned'}`
    );
    if (cfg.description) {
      console.log(`    ${chalk.gray('desc: ' + cfg.description)}`);
    }
  }
  logger.blank();
}

async function toggle() {
  const name = await askInterface();
  const iface = getOrCreate(name);
  iface.state = iface.state === 'up' ? 'down' : 'up';
  const sp = ora(`Toggling ${name}...`).start();
  await sleep(300);
  sp.stop();
  logger.success(`${name} is now ${iface.state}`);
  log(`interface ${name}: ${iface.state === 'up' ? 'no shutdown' : 'shutdown'}`);
}

async function describe() {
  const name = await askInterface();
  const desc = await askText('Description:');
  const iface = getOrCreate(name);
  iface.description = desc;
  logger.success(`Description set on ${name}`);
  log(`interface ${name}: description ${desc}`);
}

async function assignVlan() {
  const name = await askInterface();
  const vlan = await askVlanId();
  const iface = getOrCreate(name);
  iface.vlan = vlan;
  logger.success(`VLAN ${vlan} assigned to ${name}`);
  log(`interface ${name}: switchport access vlan ${vlan}`);
}

module.exports = { configure, show, toggle, describe, assignVlan };
