'use strict';

function cidrToMask(cidr) {
  const n = parseInt(cidr, 10);
  const mask = (0xffffffff << (32 - n)) >>> 0;
  return [mask >>> 24, (mask >>> 16) & 0xff, (mask >>> 8) & 0xff, mask & 0xff].join('.');
}

function ipToInt(ip) {
  return ip.split('.').reduce((acc, v) => (acc << 8) + parseInt(v, 10), 0) >>> 0;
}

function inSameSubnet(ip, network, mask) {
  const ipInt = ipToInt(ip);
  const netInt = ipToInt(network);
  const mskInt = ipToInt(mask);
  return (ipInt & mskInt) === (netInt & mskInt);
}

module.exports = { cidrToMask, ipToInt, inSameSubnet };
