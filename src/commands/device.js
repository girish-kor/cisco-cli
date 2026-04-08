'use strict';
const ora = require('ora');
const chalk = require('chalk');
const { state, log } = require('../utils/state');
const logger = require('../utils/logger');
const { askConfirm } = require('../cli/prompts');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function showVersion() {
  const sp = ora('Retrieving version info...').start();
  await sleep(300);
  sp.stop();
  logger.blank();
  console.log(chalk.white('  Cisco IOS Software, Version 15.7(3)M4'));
  console.log(`  Hostname    : ${chalk.cyan(state.hostname)}`);
  console.log('  Uptime      : 3 hours, 21 minutes');
  console.log('  Processor   : R4700 (revision 0x00), 256KB NVRAM');
  console.log('  Flash       : 64MB');
  logger.blank();
  log('show version executed');
}

async function showRunning() {
  const sp = ora('Loading running configuration...').start();
  await sleep(300);
  sp.stop();
  logger.blank();
  console.log(chalk.white(`  ! Running configuration for ${state.hostname}`));
  console.log(`  hostname ${state.hostname}`);
  for (const [name, cfg] of Object.entries(state.interfaces)) {
    console.log(`  interface ${name}`);
    if (cfg.description) {
      console.log(`   description ${cfg.description}`);
    }
    if (cfg.ip) {
      console.log(`   ip address ${cfg.ip} ${cfg.mask}`);
    }
    console.log(`   ${cfg.state === 'up' ? 'no shutdown' : 'shutdown'}`);
  }
  for (const r of state.routes) {
    console.log(`  ip route ${r.network} ${r.mask} ${r.nexthop}`);
  }
  logger.blank();
  log('show running-config executed');
}

async function showStartup() {
  const sp = ora('Loading startup configuration...').start();
  await sleep(300);
  sp.stop();
  logger.blank();
  console.log(chalk.gray('  ! Startup config mirrors last saved running config'));
  await showRunning();
}

async function saveConfig() {
  const sp = ora('Writing to NVRAM...').start();
  await sleep(400);
  sp.stop();
  logger.success('Configuration saved to NVRAM.');
  log('copy running-config startup-config');
}

async function reload() {
  const confirm = await askConfirm('Reload device? Unsaved changes will be lost.');
  if (!confirm) {
    logger.warn('Reload aborted.');
    return;
  }
  const sp = ora('Reloading...').start();
  await sleep(500);
  sp.stop();
  logger.info('Device is reloading... (simulated)');
  log('reload executed');
}

module.exports = { showVersion, showRunning, showStartup, saveConfig, reload };
