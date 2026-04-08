'use strict';
const ora = require('ora');
const chalk = require('chalk');
const { state, log } = require('../utils/state');
const logger = require('../utils/logger');
const { askIP } = require('../cli/prompts');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
function rtt() {
  return (Math.random() * 4 + 0.5).toFixed(2);
}

async function ping() {
  const target = await askIP('Target IP:');
  const sp = ora(`Pinging ${target}...`).start();
  await sleep(500);
  sp.stop();
  logger.blank();
  console.log(`  PING ${target} — 5 packets:`);
  for (let i = 1; i <= 5; i++) {
    const success = Math.random() > 0.15;
    if (success) {
      console.log(`  ${chalk.green('!')} Reply from ${target}: bytes=64 time=${rtt()}ms TTL=64`);
    } else {
      console.log(`  ${chalk.red('.')} Request timed out.`);
    }
    await sleep(150);
  }
  logger.blank();
  log(`ping ${target}`);
}

async function traceroute() {
  const target = await askIP('Target IP:');
  const sp = ora(`Tracing route to ${target}...`).start();
  await sleep(400);
  sp.stop();
  logger.blank();
  console.log(`  Traceroute to ${target} (max 8 hops):`);
  const hops = Math.floor(Math.random() * 4) + 2;
  for (let i = 1; i <= hops; i++) {
    const hop = `10.0.${i}.1`;
    await sleep(120);
    console.log(`  ${String(i).padStart(2)}  ${hop.padEnd(20)} ${rtt()} ms`);
  }
  console.log(`  ${String(hops + 1).padStart(2)}  ${target.padEnd(20)} ${rtt()} ms`);
  logger.blank();
  log(`traceroute ${target}`);
}

async function showLogs() {
  const sp = ora('Fetching syslog...').start();
  await sleep(200);
  sp.stop();
  logger.blank();
  if (state.logs.length === 0) {
    console.log(chalk.gray('  No log entries.'));
  } else {
    for (const entry of state.logs.slice(-20)) {
      console.log(`  ${chalk.gray(entry)}`);
    }
  }
  logger.blank();
}

module.exports = { ping, traceroute, showLogs };
