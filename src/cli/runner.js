'use strict';
const inquirer = require('inquirer');
const chalk = require('chalk');
const device = require('../commands/device');
const interfaces = require('../commands/interfaces');
const routing = require('../commands/routing');
const switching = require('../commands/switching');
const security = require('../commands/security');
const monitoring = require('../commands/monitoring');
const qos = require('../commands/qos');

const MENUS = {
  device: [
    { name: 'Show Version', value: 'showVersion' },
    { name: 'Show Running Config', value: 'showRunning' },
    { name: 'Show Startup Config', value: 'showStartup' },
    { name: 'Save Config', value: 'saveConfig' },
    { name: 'Reload Device', value: 'reload' }
  ],
  interfaces: [
    { name: 'Configure Interface', value: 'configure' },
    { name: 'Show Interfaces', value: 'show' },
    { name: 'Toggle State', value: 'toggle' },
    { name: 'Set Description', value: 'describe' },
    { name: 'Assign VLAN', value: 'assignVlan' }
  ],
  routing: [
    { name: 'Add Static Route', value: 'addStatic' },
    { name: 'Show Route Table', value: 'showTable' },
    { name: 'Configure OSPF', value: 'ospf' },
    { name: 'Configure BGP', value: 'bgp' }
  ],
  switching: [
    { name: 'Create VLAN', value: 'createVlan' },
    { name: 'Delete VLAN', value: 'deleteVlan' },
    { name: 'Show VLANs', value: 'showVlans' },
    { name: 'Set Trunk Mode', value: 'trunk' },
    { name: 'Set Access Mode', value: 'access' },
    { name: 'Show STP', value: 'stp' }
  ],
  security: [
    { name: 'Add ACL Rule', value: 'addAcl' },
    { name: 'Show ACLs', value: 'showAcls' },
    { name: 'Enable SSH', value: 'enableSsh' },
    { name: 'Add User', value: 'addUser' },
    { name: 'Show Users', value: 'showUsers' }
  ],
  monitoring: [
    { name: 'Ping', value: 'ping' },
    { name: 'Traceroute', value: 'traceroute' },
    { name: 'Show Logs', value: 'showLogs' }
  ],
  qos: [
    { name: 'Add QoS Rule', value: 'addQos' },
    { name: 'Show QoS Rules', value: 'showQos' },
    { name: 'Configure DHCP', value: 'dhcp' },
    { name: 'Show DHCP Leases', value: 'showDhcp' }
  ]
};

const HANDLERS = { device, interfaces, routing, switching, security, monitoring, qos };

async function run(category) {
  const choices = [
    ...MENUS[category],
    new inquirer.Separator(),
    { name: chalk.gray('← Back'), value: '__back' }
  ];

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: `${category.charAt(0).toUpperCase() + category.slice(1)} — choose action:`,
      choices
    }
  ]);

  if (action === '__back') {
    return;
  }

  const handler = HANDLERS[category];
  if (handler && typeof handler[action] === 'function') {
    await handler[action]();
  } else {
    console.log(chalk.yellow('  Action not implemented.'));
  }
}

module.exports = { run };
