'use strict';
const ora = require('ora');
const chalk = require('chalk');
const { state, log } = require('../utils/state');
const logger = require('../utils/logger');
const { askVlanId, askText, askInterface } = require('../cli/prompts');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function createVlan() {
  const id = await askVlanId('VLAN ID to create:');
  const name = await askText('VLAN name:');
  state.vlans[id] = { name, id };
  const sp = ora(`Creating VLAN ${id}...`).start();
  await sleep(300);
  sp.stop();
  logger.success(`VLAN ${id} (${name}) created.`);
  log(`vlan ${id}: name ${name}`);
}

async function deleteVlan() {
  const id = await askVlanId('VLAN ID to delete:');
  if (!state.vlans[id]) {
    logger.warn(`VLAN ${id} does not exist.`);
    return;
  }
  delete state.vlans[id];
  logger.success(`VLAN ${id} deleted.`);
  log(`no vlan ${id}`);
}

async function showVlans() {
  const sp = ora('Fetching VLAN table...').start();
  await sleep(250);
  sp.stop();
  logger.blank();
  if (Object.keys(state.vlans).length === 0) {
    console.log(chalk.gray('  No VLANs configured.'));
  } else {
    console.log(`  ${'ID'.padEnd(8)}${'Name'.padEnd(20)}Status`);
    console.log(`  ${'─'.repeat(40)}`);
    for (const [id, v] of Object.entries(state.vlans)) {
      console.log(`  ${String(id).padEnd(8)}${v.name.padEnd(20)}active`);
    }
  }
  logger.blank();
}

async function trunk() {
  const name = await askInterface();
  const iface = state.interfaces[name];
  if (!iface) {
    logger.error(`Interface ${name} not found.`);
    return;
  }
  iface.mode = 'trunk';
  logger.success(`${name} set to trunk mode.`);
  log(`interface ${name}: switchport mode trunk`);
}

async function access() {
  const name = await askInterface();
  const vlan = await askVlanId('Access VLAN:');
  const iface =
    state.interfaces[name] ||
    (state.interfaces[name] = { ip: null, mask: null, state: 'down', description: '', vlan: null });
  iface.mode = 'access';
  iface.vlan = vlan;
  logger.success(`${name} set to access mode, VLAN ${vlan}.`);
  log(`interface ${name}: switchport access vlan ${vlan}`);
}

async function stp() {
  const sp = ora('Reading STP topology...').start();
  await sleep(300);
  sp.stop();
  logger.blank();
  console.log('  STP Mode    : PVST+');
  console.log(`  Root Bridge : ${chalk.cyan(state.hostname)}`);
  console.log('  Priority    : 32768');
  const ifaces = Object.keys(state.interfaces);
  for (const name of ifaces) {
    console.log(`  ${name.padEnd(30)} ${chalk.green('FWD')}  128.1`);
  }
  logger.blank();
}

module.exports = { createVlan, deleteVlan, showVlans, trunk, access, stp };
