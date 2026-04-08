'use strict';

const state = {
  hostname: 'Router1',
  interfaces: {
    'GigabitEthernet0/0': { ip: null, mask: null, state: 'down', description: '', vlan: null },
    'GigabitEthernet0/1': { ip: null, mask: null, state: 'down', description: '', vlan: null },
    'FastEthernet0/0': { ip: null, mask: null, state: 'down', description: '', vlan: null }
  },
  routes: [],
  vlans: {},
  acls: [],
  users: [{ username: 'admin', privilege: 15 }],
  ospf: { enabled: false, processId: null, networks: [] },
  bgp: { enabled: false, asn: null, neighbors: [] },
  dhcp: { pools: [] },
  qosRules: [],
  logs: [],
  sshEnabled: false
};

function log(msg) {
  const ts = new Date().toISOString();
  state.logs.push(`[${ts}] ${msg}`);
  if (state.logs.length > 200) {
    state.logs.shift();
  }
}

module.exports = { state, log };
