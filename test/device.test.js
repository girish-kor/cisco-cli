'use strict';
const { state } = require('../src/utils/state');
const { validateIP, validateInterface, validateVlanId } = require('../src/utils/validator');

test('validateIP accepts valid IPs', () => {
  expect(validateIP('192.168.1.1')).toBe(true);
  expect(validateIP('10.0.0.1')).toBe(true);
});

test('validateIP rejects invalid IPs', () => {
  expect(validateIP('999.1.1.1')).toBe(false);
  expect(validateIP('abc')).toBe(false);
});

test('validateInterface accepts valid names', () => {
  expect(validateInterface('GigabitEthernet0/0')).toBe(true);
  expect(validateInterface('Loopback0')).toBe(true);
});

test('validateVlanId accepts valid IDs', () => {
  expect(validateVlanId('1')).toBe(true);
  expect(validateVlanId('4094')).toBe(true);
});

test('validateVlanId rejects invalid IDs', () => {
  expect(validateVlanId('0')).toBe(false);
  expect(validateVlanId('4095')).toBe(false);
});

test('state has default interfaces', () => {
  expect(Object.keys(state.interfaces).length).toBeGreaterThan(0);
});
