'use strict';

function validateIP(ip) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) && ip.split('.').every((n) => parseInt(n, 10) <= 255);
}

function validateInterface(name) {
  return /^(GigabitEthernet|FastEthernet|Ethernet|Loopback|Serial|Vlan)\d+(\/\d+)*$/i.test(name);
}

function validateVlanId(id) {
  const n = parseInt(id, 10);
  return !isNaN(n) && n >= 1 && n <= 4094;
}

function validateASN(asn) {
  const n = parseInt(asn, 10);
  return !isNaN(n) && n >= 1 && n <= 65535;
}

module.exports = { validateIP, validateInterface, validateVlanId, validateASN };
