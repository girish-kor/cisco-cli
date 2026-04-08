# Cisco CLI Simulator

Interactive Cisco CLI simulator for practicing networking commands and device configuration in an isolated, safe environment.

---

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Getting Started](#getting-started)
3. [Navigation Basics](#navigation-basics)
4. [Device Management](#device-management)
5. [Interfaces Configuration](#interfaces-configuration)
6. [Routing](#routing)
7. [Switching & VLANs](#switching--vlans)
8. [Security](#security)
9. [Monitoring & Diagnostics](#monitoring--diagnostics)
10. [QoS & Services](#qos--services)
11. [Docker Usage](#docker-usage)
12. [Troubleshooting](#troubleshooting)

---

## Installation & Setup

### Global Installation (via npm)

Install the package globally from npm registry:

```bash
npm install @cisco-cli/simulator
```

Then run it using:

```bash
npx cisco-cli
```

You should see:

```
  Cisco CLI Simulator
  ─────────────────────────────

  Select category:
```

### Local Installation

**Prerequisites:**

- Node.js 14.0 or higher
- npm 6.0 or higher

**Steps:**

1. **Clone or download the repository**

   ```bash
   git clone https://github.com/girish-kor/cisco-cli.git
   cd cisco-cli
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the simulator**
   ```bash
   npm start
   ```

You should see:

```
  Cisco CLI Simulator
  ─────────────────────────────

  Select category:
```

### Update Installation

To update to the latest version:

```bash
git pull origin main
npm install
npm start
```

---

## Getting Started

### First Run

1. Execute `npm start`
2. You'll see the main menu with 7 categories
3. Use arrow keys to navigate
4. Press Enter to select an option
5. Type `Exit` or select **Exit** to quit

### Available Categories

Each category contains multiple operations:

- **Device Management** — View version, config, save settings
- **Interfaces** — Configure IP addresses, toggle ports, descriptions
- **Routing** — Static routes, OSPF, BGP configuration
- **Switching** — VLANs, trunk/access modes, STP
- **Security** — ACLs, SSH, user management
- **Monitoring** — Ping, traceroute, logs
- **QoS / Services** — Quality of Service policies, DHCP pools

---

## Navigation Basics

### Menu Navigation

- **Arrow Keys** — Move up/down between options
- **Enter** — Select highlighted option
- **Number Keys** — Quickly select by number (when applicable)
- **Q / Escape** — Exit current prompt (varies by context)

### Input Types

**Text Input:**

```
? Enter hostname: router-01
```

Just type and press Enter.

**Yes/No Confirmation:**

```
? Reload device? (Y/n)
```

Type `y` or `Y` for yes, `n` or `N` for no, or just press Enter for default.

**List Selection:**

```
? Select interface: (Use arrow keys)
  ❯ Gi0/0
    Gi0/1
    Gi1/0
```

Use arrow keys to highlight, then press Enter.

**Number Input:**

```
? VLAN ID (1-4094): 10
```

Type the number and press Enter.

---

## Device Management

Manage basic device properties and configurations.

### View Device Version

**Path:** Device Management → Show Version

**What it displays:**

- IOS version
- Hostname
- Uptime
- Processor details
- Memory info (NVRAM, Flash)

**Use case:** Verify device specifications and current uptime.

### View Running Configuration

**Path:** Device Management → Show Running Config

**What it displays:**

- Current hostname
- All configured interfaces with IP addresses and state
- All configured static routes
- ACLs, OSPF, BGP settings (if configured)

**Use case:** Review all active configurations currently in effect.

### View Startup Configuration

**Path:** Device Management → Show Startup Config

**What it displays:**

- Exact copy of the last saved configuration
- Shows what will be loaded on next device reload

**Use case:** Verify saved settings match your current running config.

### Save Configuration

**Path:** Device Management → Save Configuration

**What it does:**

- Writes current running config to NVRAM (non-volatile memory)
- Saves configuration so it persists after reload

**Steps:**

1. Select "Save Configuration"
2. Wait for "Writing to NVRAM..." to complete
3. See success message: "Configuration saved to NVRAM."

**Important:** Always save before exit if you want to keep changes!

### Reload Device

**Path:** Device Management → Reload

**What it does:**

- Simulates device restart
- Reloads from startup config
- Clears unsaved changes

**Steps:**

1. Select "Reload"
2. Confirm: "Reload device? Unsaved changes will be lost."
3. Type `y` to confirm or `n` to cancel
4. Device restarts (simulated)

**Warning:** Unsaved running config is lost. Save first if you need changes!

---

## Interfaces Configuration

Configure network interface IP addresses, descriptions, and line states.

### Configure Interface IP

**Path:** Interfaces → Configure Interface

**Steps:**

1. Enter interface name (examples: `Gi0/0`, `Fa0/1`, `Eth0`)
2. Enter IP address (example: `192.168.1.1`)
3. Enter subnet mask (example: `255.255.255.0`)
4. Interface state automatically changes to `up`

**Result:** Interface is active and assigned to the network.

**Example:**

```
? Interface to configure: Gi0/0
? IP address: 10.1.1.1
? Subnet mask: 255.255.255.0
✓ Gi0/0 → 10.1.1.1/255.255.255.0 (up)
```

### Show Interface Status

**Path:** Interfaces → Show Interface Status

**What it displays:**

- Interface name
- Current state (up/down)
- IP address and subnet mask (if configured)
- Description (if set)

**Example output:**

```
  Gi0/0                          up         10.1.1.1/255.255.255.0
    desc: Link to Core
  Gi0/1                          down       unassigned
  Fa1/0                          up         172.16.1.1/255.255.255.0
```

### Toggle Interface State

**Path:** Interfaces → Toggle Interface State

**What it does:**

- Enables (shutdown/no shutdown) or disables interface
- Toggles between `up` and `down`

**Steps:**

1. Select interface name
2. State automatically switches

**Typical use:**

- Disable problematic interface: set to `down`
- Re-enable after troubleshooting: set to `up`

### Set Interface Description

**Path:** Interfaces → Set Interface Description

**What it does:**

- Adds or updates descriptive text on interface
- Helps identify interface purpose
- Shown in interface status listings

**Steps:**

1. Select interface
2. Enter description (example: `Link to core router` or `Connect to switch-1`)

**Example:**

```
? Interface: Gi0/0
? Description: Primary uplink to ISP
✓ Description set on Gi0/0
```

### Assign Interface to VLAN

**Path:** Interfaces → Assign to VLAN

**What it does:**

- Assigns Layer 2 interface to specific VLAN
- Only works on access mode interfaces

**Steps:**

1. Select interface
2. Enter VLAN ID (1–4094, typically 1–100 for practice)

**Example:**

```
? Interface: Fa1/0
? VLAN ID: 20
✓ VLAN 20 assigned to Fa1/0
```

---

## Routing

Configure static routes, dynamic routing protocols (OSPF, BGP).

### Add Static Route

**Path:** Routing → Add Static Route

**What it does:**

- Creates permanent route to destination network
- Routes never change unless manually reconfigured

**Steps:**

1. Destination network (example: `10.0.0.0`)
2. Subnet mask (example: `255.255.255.0`)
3. Next-hop IP (example: `192.168.1.1`)

**Example:**

```
? Destination network: 10.2.0.0
? Subnet mask: 255.255.0.0
? Next-hop IP: 192.168.1.2
✓ Static route: 10.2.0.0/255.255.0.0 via 192.168.1.2
```

### Show Route Table

**Path:** Routing → Show Route Table

**What it displays:**

- Type of route (S = static, O = OSPF, B = BGP)
- Network address and mask
- Next-hop gateway IP

**Example:**

```
  S    10.2.0.0          255.255.0.0         via 192.168.1.2
  S    10.3.0.0          255.255.255.0       via 192.168.1.3
  O    10.4.0.0          255.255.255.0       [110/1]
```

### Configure OSPF

**Path:** Routing → Configure OSPF

**What it does:**

- Enables dynamic routing via OSPF protocol
- Automatically discovers and updates routes
- Single configuration adds one network to OSPF

**Steps:**

1. OSPF Process ID (number, example: `1`)
2. Network address (example: `10.0.0.0`)
3. Wildcard mask (inverse netmask, example: `0.0.0.255`)
4. Area ID (usually `0` for backbone area)

**Example:**

```
? OSPF Process ID: 1
? Network: 10.0.0.0
? Wildcard mask: 0.0.0.255
? Area ID: 0
✓ OSPF process 1 — network 10.0.0.0 0.0.0.255 area 0
```

**Wildcard mask quick reference:**

- `/24` (255.255.255.0) → wildcard `0.0.0.255`
- `/16` (255.255.0.0) → wildcard `0.0.255.255`
- `/8` (255.0.0.0) → wildcard `0.255.255.255`

### Configure BGP

**Path:** Routing → Configure BGP

**What it does:**

- Enables Border Gateway Protocol for inter-AS routing
- Requires AS number assignment

**Steps:**

1. Local ASN (1–65535, example: `65001`)
2. Remote neighbor IP (example: `203.0.113.1`)
3. Remote neighbor ASN (example: `65000`)

**Example:**

```
? Local ASN: 65001
? Neighbor IP: 203.0.113.1
? Neighbor ASN: 65000
✓ BGP 65001 neighbor 203.0.113.1 (remote AS 65000)
```

**ASN ranges:**

- **Public:** 1–64495
- **Private:** 64512–65534

---

## Switching & VLANs

Configure VLANs, trunks, and access ports.

### Create VLAN

**Path:** Switching → Create VLAN

**Steps:**

1. VLAN ID (1–4094, typically 1–100)
2. VLAN name (descriptive text, example: `Sales`)

**Example:**

```
? VLAN ID to create: 20
? VLAN name: Sales Dept
✓ VLAN 20 (Sales Dept) created.
```

### Delete VLAN

**Path:** Switching → Delete VLAN

**Steps:**

1. Select VLAN ID to remove
2. VLAN is immediately deleted

**Note:** Cannot delete VLAN 1 (default VLAN).

### Show VLAN Status

**Path:** Switching → Show VLAN Status

**What it displays:**

- All created VLANs
- VLAN IDs and names
- Status (active/suspended)

**Example output:**

```
  ID      Name                Status
  ────────────────────────────────────
  1       default             active
  10      Management          active
  20      Sales Dept          active
  30      Engineering         active
```

### Set Interface to Trunk Mode

**Path:** Switching → Set Trunk Mode

**What it does:**

- Converts access port to trunk port
- Trunk ports carry traffic for multiple VLANs

**Steps:**

1. Select interface (example: `Gi0/0`)
2. Confirm setting to trunk mode

**Example:**

```
? Select interface: Gi0/0
✓ Gi0/0 set to trunk mode.
```

**When to use:** Connections between switches or multilayer switches.

### Set Interface to Access Mode

**Path:** Switching → Set Access Mode

**What it does:**

- Converts trunk port to access port
- Access ports belong to single VLAN

**Steps:**

1. Select interface
2. Select VLAN for access mode

**Example:**

```
? Select interface: Fa1/0
? VLAN for access mode: 20
✓ Fa1/0 set to access mode, VLAN 20.
```

**When to use:** End-user device connections (computers, phones, printers).

---

## Security

Configure ACLs, SSH, and user management.

### Add ACL Rule

**Path:** Security → Add ACL

**Steps:**

1. ACL type: `standard` or `extended`
2. ACL number (numeric identifier)
3. Action: `permit` or `deny`
4. Source IP address
5. Destination IP (extended only)

**Standard ACL Example:**

```
? ACL type: standard
? ACL number: 10
? Action: permit
? Source IP: 192.168.1.0
✓ ACL 10: permit 192.168.1.0
```

**Extended ACL Example:**

```
? ACL type: extended
? ACL number: 100
? Action: deny
? Source IP: 10.1.5.0
? Destination IP: 172.16.0.0
✓ ACL 100: deny 10.1.5.0 → 172.16.0.0
```

**When to use:**

- **Standard ACL:** Filter by source IP only
- **Extended ACL:** Filter by source, destination, and protocol

### Show All ACLs

**Path:** Security → Show ACLs

**What it displays:**

- All configured ACL entries
- Type (standard/extended)
- ACL number, action, source, destination IPs

**Example output:**

```
  standard  10      permit   192.168.1.0
  extended  100     deny     10.1.5.0 → 172.16.0.0
  extended  100     permit   any → any
```

### Enable SSH

**Path:** Security → Enable SSH

**What it does:**

- Enables secure remote access
- Activates RSA encryption (simulated)
- SSH available on VTY lines 0–4

**Steps:**

1. Select "Enable SSH"
2. Wait for confirmation

**Result:**

```
✓ SSH enabled on VTY lines 0–4 (RSA key simulated).
```

**Note:** Telnet not available; SSH is secure replacement.

### Add User Account

**Path:** Security → Add User Account

**What it does:**

- Creates local user for device access
- Assigns privilege level (1–15)

**Steps:**

1. Username (example: `admin`)
2. Password (example: `Cisco123!`)
3. Privilege level (typically 15 for admin, 1 for read-only)

**Example:**

```
? Username: networkadmin
? Password: SecureP@ss1
? Privilege level: 15
✓ User networkadmin created (privilege 15).
```

### Show User Accounts

**Path:** Security → Show User Accounts

**What it displays:**

- All configured local users
- Privilege levels
- Status

**Example output:**

```
  networkadmin     privilege 15
  readonly         privilege 1
  auditor          privilege 5
```

---

## Monitoring & Diagnostics

Test connectivity and view system logs.

### Ping Target

**Path:** Monitoring → Ping

**What it does:**

- Tests reachability to target IP
- Sends 5 test packets
- Shows response time (RTT) for each

**Steps:**

1. Enter target IP address

**Example output:**

```
  PING 10.1.1.1 — 5 packets:
  ✓ Reply from 10.1.1.1: bytes=64 time=1.23ms TTL=64
  ✓ Reply from 10.1.1.1: bytes=64 time=0.87ms TTL=64
  ✓ Reply from 10.1.1.1: bytes=64 time=1.05ms TTL=64
  ✓ Reply from 10.1.1.1: bytes=64 time=0.92ms TTL=64
  ✓ Reply from 10.1.1.1: bytes=64 time=1.18ms TTL=64
```

**Interpretation:**

- `✓` (green) = Packet successfully received
- `.` (red) = Timeout, no response
- **time=** = Round-trip delay in milliseconds

### Traceroute to Target

**Path:** Monitoring → Traceroute

**What it does:**

- Shows the path packets take to reach destination
- Lists each hop (router) along the route
- Shows latency for each hop

**Steps:**

1. Enter target IP address

**Example output:**

```
  Traceroute to 10.4.1.1 (max 8 hops):
   1  10.0.1.1             1.23 ms
   2  10.0.2.1             2.45 ms
   3  10.0.3.1             3.67 ms
   4  10.4.1.1             4.12 ms
```

**Reading traceroute:**

- **1, 2, 3, 4** = hop number
- **IP address** = router IP at that hop
- **ms** = round-trip time to that hop

### Show System Logs

**Path:** Monitoring → Show Logs

**What it displays:**

- System events and activities
- Timestamps
- Log severity levels

**Example output:**

```
  [10:23:45] Configuration change: interface Gi0/0 set to up
  [10:24:12] ACL 10 created: permit 192.168.1.0
  [10:25:33] OSPF process 1 enabled
  [10:26:01] VLAN 20 created: Sales Dept
```

**Use for:** Auditing recent changes and troubleshooting issues.

---

## QoS & Services

Configure Quality of Service policies and DHCP.

### Add QoS Policy

**Path:** QoS / Services → Add QoS Policy

**What it does:**

- Creates traffic classification and prioritization rule
- Marks traffic with DSCP value
- Allocates bandwidth

**Steps:**

1. Class-map name (example: `VoIP`, `Video`, `BestEffort`)
2. DSCP marking (predefined values):
   - `ef` — Expedited Forwarding (voice, video)
   - `af11`, `af21`, `af31`, `af41` — Assured Forwarding
   - `cs1`, `cs2`, `cs3` — Class Selector
   - `default` — Best effort
3. Bandwidth in Kbps (example: `1000`)

**Example:**

```
? Class-map name: VoIP Traffic
? DSCP marking: ef
? Bandwidth (kbps): 5000
✓ QoS rule: class VoIP Traffic dscp ef bandwidth 5000kbps
```

**Common DSCP values:**

- **EF (46):** Real-time voice/video
- **AF41:** Interactive video
- **AF21:** Transactional data
- **Default:** General IP traffic

### Show QoS Policies

**Path:** QoS / Services → Show QoS Policies

**What it displays:**

- All configured QoS rules
- Class names, DSCP values, bandwidth allocation

**Example output:**

```
  Class              DSCP        BW (kbps)
  ─────────────────────────────────────
  VoIP Traffic      ef          5000
  Video Streaming   af41        10000
  BestEffort        default     1000
```

### Configure DHCP Pool

**Path:** QoS / Services → Configure DHCP

**What it does:**

- Creates DHCP address pool for subnet
- Automatically assigns IPs to clients

**Steps:**

1. Pool name (example: `LAN1`, `Guest`)
2. Network address (example: `192.168.1.0`)
3. Subnet mask (example: `255.255.255.0`)
4. Default gateway IP (example: `192.168.1.1`)
5. DNS servers (space-separated, example: `8.8.8.8 1.1.1.1`)

**Example:**

```
? Pool name: Sales_LAN
? Network address: 192.168.10.0
? Subnet mask: 255.255.255.0
? Default gateway: 192.168.10.1
? DNS servers: 8.8.8.8 1.1.1.1
✓ DHCP pool Sales_LAN configured
   - Network: 192.168.10.0/255.255.255.0
   - Gateway: 192.168.10.1
   - DNS: 8.8.8.8, 1.1.1.1
```

### Show DHCP Pools

**Path:** QoS / Services → Show DHCP Pools

**What it displays:**

- All configured DHCP pools
- Network ranges, gateways, DNS servers

**Example output:**

```
  Pool           Network            Gateway        DNS Servers
  ─────────────────────────────────────────────────────────────
  Sales_LAN      192.168.10.0/24    192.168.10.1   8.8.8.8
  Guest          192.168.50.0/24    192.168.50.1   1.1.1.1
```

---

## Docker Usage

Run the simulator in a containerized environment.

### Build Docker Image

**Steps:**

1. Navigate to project directory
2. Build image:
   ```bash
   docker build -t cisco-cli .
   ```
3. Wait for build to complete (2–5 minutes)

### Run Container

**Interactive Mode (recommended):**

```bash
docker run -it cisco-cli
```

**What `-it` means:**

- `-i` = Interactive (keep stdin open)
- `-t` = Allocate pseudo-terminal

**Named Container:**

```bash
docker run -it --name my-cisco-cli cisco-cli
```

**Background Mode:**

```bash
docker run -d --name cisco-cli cisco-cli
```

### Stop Container

**Stop gracefully:**

```bash
docker stop my-cisco-cli
```

**Force stop:**

```bash
docker kill my-cisco-cli
```

### Remove Container/Image

**Remove container:**

```bash
docker rm my-cisco-cli
```

**Remove image:**

```bash
docker rmi cisco-cli
```

---

## Troubleshooting

### Issue: Commands not appearing in menu

**Cause:** Scroll position in menu.

**Solution:**

- Use arrow keys to navigate through all menu items
- Some options may be below the visible area
- Page down to see more items

### Issue: Configuration lost after exit

**Cause:** Configuration not saved.

**Solution:**

1. Before exiting, go to **Device Management**
2. Select **Save Configuration**
3. Wait for "Configuration saved to NVRAM"
4. Exit normally

### Issue: Interface won't set to up

**Cause:** IP address not assigned.

**Solution:**

1. Go to **Interfaces**
2. Select **Configure Interface**
3. Assign IP address and subnet mask
4. Interface automatically sets to `up`

### Issue: Static route not appearing in table

**Cause:** Route not added correctly.

**Solution:**

1. **Routing** → **Add Static Route**
2. Verify entries:
   - Destination network (e.g., `10.0.0.0`)
   - Subnet mask (e.g., `255.255.255.0`)
   - Next-hop IP should be reachable
3. View with **Show Route Table**

### Issue: OSPF network not showing

**Cause:** OSPF not enabled or network not added.

**Solution:**

1. Go to **Routing** → **Configure OSPF**
2. Enter OSPF Process ID (e.g., `1`)
3. Add network(s) with wildcard masks
4. Verify with **Show Route Table** (routes appear as `O`)

### Issue: SSH won't enable

**Cause:** Device state issue or syntax error.

**Solution:**

1. **Security** → **Enable SSH**
2. Confirm success message appears
3. To verify: View running config

### Issue: Cannot create VLAN

**Cause:** VLAN ID outside valid range.

**Solution:**

- Valid VLAN ID range: **1–4094**
- Reserved: VLAN 1 (default), VLANs 1002–1005 (Token Ring)
- Usable for practice: **10–100**

### Issue: ACL not filtering traffic

**Cause:** ACL created but not applied to interface.

**Solution:**

1. Go to **Security** → **Add ACL** to create rule
2. Rules are stored but not active until applied
3. View with **Show ACLs** to confirm creation

### Issue: Ping shows "Request timed out"

**Cause:** Target unreachable or not configured.

**Solution:**

1. Verify target IP in your network
2. Check interface status: **Interfaces** → **Show Interface Status**
3. Check routing table: **Routing** → **Show Route Table**
4. Try local IP first to test

### Issue: Docker container exits immediately

**Cause:** Process terminated or error in startup.

**Solution:**

1. Check logs:
   ```bash
   docker logs <container-id>
   ```
2. Use interactive mode:
   ```bash
   docker run -it cisco-cli
   ```
3. Verify Node.js installed in container

### Issue: Cannot connect to container

**Cause:** Container not running or port not exposed.

**Solution:**

1. Check running containers:
   ```bash
   docker ps
   ```
2. Start if not running:
   ```bash
   docker run -it cisco-cli
   ```
3. Verify no errors in startup

---

## Tips & Best Practices

### Organize Your Config

1. **Build incrementally:**
   - First: Configure basic interfaces
   - Then: Add static routes or routing protocols
   - Finally: Add security policies

2. **Document with descriptions:**
   - Always set interface descriptions
   - Name VLANs semantically (e.g., `Sales`, `Management`)
   - Use meaningful class names for QoS

3. **Save frequently:**
   - Save after each major change
   - Save before testing potentially breaking changes
   - Reload to test startup config

### Testing Workflow

1. Configure interfaces and IP addresses
2. Add routing (static or dynamic)
3. Test with Ping and Traceroute
4. Review with Show commands
5. Save configuration
6. Reload to verify persistence

### Common Config Scenarios

**Scenario 1: Basic LAN Setup**

- Create VLAN 10 (LAN)
- Assign interface Gi0/0 to VLAN 10, IP: 192.168.1.1/24
- Create DHCP pool for `192.168.1.0/24`
- Enable SSH for remote access
- Save configuration

**Scenario 2: Multi-Router Network**

- Configure each router with unique IP on inter-router links
- Add static routes to all networks
- Test with Ping/Traceroute
- Replace with OSPF for dynamic routing

**Scenario 3: Security Policy**

- Create standard ACL to permit trusted subnets
- Create extended ACL to deny specific traffic patterns
- Add SSH, disable Telnet
- Create local users with privilege levels
- View logs to audit access

---

## Keyboard Shortcuts & Tips

| Key    | Function                            |
| ------ | ----------------------------------- |
| ↑ / ↓  | Navigate menu items                 |
| ← / →  | Scroll (some lists)                 |
| Enter  | Select item                         |
| Ctrl+C | Exit current menu (returns to main) |
| Q      | Quit application                    |
| Ctrl+L | Clear screen (terminal)             |

---

## Common Commands Reference

| Task              | Location                                |
| ----------------- | --------------------------------------- |
| View device info  | Device Management → Show Version        |
| Show all config   | Device Management → Show Running Config |
| Save changes      | Device Management → Save Configuration  |
| Set IP address    | Interfaces → Configure Interface        |
| Add route         | Routing → Add Static Route              |
| Create VLAN       | Switching → Create VLAN                 |
| Add firewall rule | Security → Add ACL                      |
| Enable SSH        | Security → Enable SSH                   |
| Test connectivity | Monitoring → Ping                       |
| View logs         | Monitoring → Show Logs                  |
| Add QoS class     | QoS / Services → Add QoS Policy         |

---

## Getting Help

- **GitHub Issues:** Report bugs at [cisco-cli/issues](https://github.com/girish-kor/cisco-cli/issues)
- **License:** MIT — see LICENSE file

---

**Version:** 1.0.0  
**Last Updated:** 2026  
**Maintainer:** Girish Kor
