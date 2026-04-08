'use strict';
const ora = require('ora');
const chalk = require('chalk');
const { state, log } = require('../utils/state');
const logger = require('../utils/logger');
const { askIP, askMask, askText } = require('../cli/prompts');
const { validateASN } = require('../utils/validator');
const inquirer = require('inquirer');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function addStatic() {
  const network = await askIP('Destination network:');
  const mask = await askMask('Subnet mask:');
  const nexthop = await askIP('Next-hop IP:');
  state.routes.push({ network, mask, nexthop, type: 'S' });
  const sp = ora('Installing static route...').start();
  await sleep(300);
  sp.stop();
  logger.success(`Static route: ${network}/${mask} via ${nexthop}`);
  log(`ip route ${network} ${mask} ${nexthop}`);
}

async function showTable() {
  const sp = ora('Reading route table...').start();
  await sleep(250);
  sp.stop();
  logger.blank();
  if (state.routes.length === 0) {
    console.log(chalk.gray('  No routes configured.'));
  } else {
    for (const r of state.routes) {
      console.log(
        `  ${chalk.cyan(r.type.padEnd(4))} ${r.network.padEnd(18)} ${r.mask.padEnd(18)} via ${r.nexthop}`
      );
    }
  }
  if (state.ospf.enabled) {
    for (const n of state.ospf.networks) {
      console.log(
        `  ${chalk.yellow('O'.padEnd(4))} ${n.network.padEnd(18)} ${n.mask.padEnd(18)} [110/1]`
      );
    }
  }
  logger.blank();
}

async function ospf() {
  const { processId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'processId',
      message: 'OSPF Process ID:',
      validate: (v) => (/^\d+$/.test(v) ? true : 'Must be a number')
    }
  ]);
  const network = await askIP('Network:');
  const mask = await askMask('Wildcard mask:');
  const area = await askText('Area ID (e.g. 0):');
  state.ospf.enabled = true;
  state.ospf.processId = processId;
  state.ospf.networks.push({ network, mask, area });
  const sp = ora('Configuring OSPF...').start();
  await sleep(350);
  sp.stop();
  logger.success(`OSPF process ${processId} — network ${network} ${mask} area ${area}`);
  log(`router ospf ${processId}: network ${network} ${mask} area ${area}`);
}

async function bgp() {
  const { asn } = await inquirer.prompt([
    {
      type: 'input',
      name: 'asn',
      message: 'Local ASN:',
      validate: (v) => (validateASN(v) ? true : 'ASN must be 1–65535')
    }
  ]);
  const neighbor = await askIP('Neighbor IP:');
  const { remoteAsn } = await inquirer.prompt([
    {
      type: 'input',
      name: 'remoteAsn',
      message: 'Remote ASN:',
      validate: (v) => (validateASN(v) ? true : 'ASN must be 1–65535')
    }
  ]);
  state.bgp.enabled = true;
  state.bgp.asn = asn;
  state.bgp.neighbors.push({ ip: neighbor, remoteAsn });
  const sp = ora('Configuring BGP...').start();
  await sleep(350);
  sp.stop();
  logger.success(`BGP AS ${asn} — neighbor ${neighbor} remote-as ${remoteAsn}`);
  log(`router bgp ${asn}: neighbor ${neighbor} remote-as ${remoteAsn}`);
}

module.exports = { addStatic, showTable, ospf, bgp };
