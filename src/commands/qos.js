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

async function addQos() {
  const className = await askText('Class-map name:');
  const dscp = await askChoice('DSCP marking:', [
    'af11',
    'af21',
    'af31',
    'af41',
    'ef',
    'cs1',
    'cs2',
    'cs3',
    'default'
  ]);
  const { bw } = await inquirer.prompt([
    {
      type: 'input',
      name: 'bw',
      message: 'Bandwidth (kbps):',
      validate: (v) => (/^\d+$/.test(v) ? true : 'Must be numeric')
    }
  ]);
  state.qosRules.push({ className, dscp, bandwidth: parseInt(bw, 10) });
  const sp = ora('Applying QoS policy...').start();
  await sleep(300);
  sp.stop();
  logger.success(`QoS rule: class ${className} dscp ${dscp} bandwidth ${bw}kbps`);
  log(`policy-map: class ${className} set dscp ${dscp} bandwidth ${bw}`);
}

async function showQos() {
  const sp = ora('Reading QoS policies...').start();
  await sleep(250);
  sp.stop();
  logger.blank();
  if (state.qosRules.length === 0) {
    console.log(chalk.gray('  No QoS rules configured.'));
  } else {
    console.log(`  ${'Class'.padEnd(24)}${'DSCP'.padEnd(10)}BW (kbps)`);
    console.log(`  ${'─'.repeat(44)}`);
    for (const r of state.qosRules) {
      console.log(`  ${r.className.padEnd(24)}${r.dscp.padEnd(10)}${r.bandwidth}`);
    }
  }
  logger.blank();
}

async function dhcp() {
  const poolName = await askText('Pool name:');
  const network = await askIP('Network address:');
  const { mask } = await inquirer.prompt([
    {
      type: 'input',
      name: 'mask',
      message: 'Subnet mask:'
    }
  ]);
  const gateway = await askIP('Default gateway:');
  const dns = await askIP('DNS server:');
  state.dhcp.pools.push({ poolName, network, mask, gateway, dns });
  const sp = ora('Configuring DHCP pool...').start();
  await sleep(300);
  sp.stop();
  logger.success(`DHCP pool '${poolName}': ${network}/${mask} GW ${gateway} DNS ${dns}`);
  log(
    `ip dhcp pool ${poolName}: network ${network} ${mask} default-router ${gateway} dns-server ${dns}`
  );
}

async function showDhcp() {
  const sp = ora('Fetching DHCP leases...').start();
  await sleep(250);
  sp.stop();
  logger.blank();
  if (state.dhcp.pools.length === 0) {
    console.log(chalk.gray('  No DHCP pools configured.'));
  } else {
    for (const p of state.dhcp.pools) {
      console.log(`  Pool: ${chalk.cyan(p.poolName)}`);
      console.log(`    Network : ${p.network} ${p.mask}`);
      console.log(`    Gateway : ${p.gateway}`);
      console.log(`    DNS     : ${p.dns}`);
      console.log();
    }
  }
}

module.exports = { addQos, showQos, dhcp, showDhcp };
