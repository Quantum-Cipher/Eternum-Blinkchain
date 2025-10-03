const fs = require('fs');
const path = require('path');

const GENESIS_TIMESTAMP = 1696200000; // Replace with your actual genesis time
const INTERVAL_SECONDS = 86400;       // One pulse per day

function currentPulse() {
  const now = Math.floor(Date.now() / 1000);
  return Math.floor((now - GENESIS_TIMESTAMP) / INTERVAL_SECONDS);
}

function emitManifest(pulse) {
  const manifest = {
    pulse,
    timestamp: new Date().toISOString(),
    manifest_cid: "pending",
    sigil_hex: "pending",
    entropy_hash: "pending",
    raw_tx: "pending"
  };

  const dir = path.join(__dirname, '../ipfs_index');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const filePath = path.join(dir, `pulse_${pulse}.json`);
  fs.writeFileSync(filePath, JSON.stringify(manifest, null, 2));
}

const pulse = currentPulse();
emitManifest(pulse);
