const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const GENESIS_TIMESTAMP = 1696200000;
const INTERVAL_SECONDS = 86400;

function currentPulse() {
  const now = Math.floor(Date.now() / 1000);
  return Math.floor((now - GENESIS_TIMESTAMP) / INTERVAL_SECONDS);
}

function generateEntropy(pulse) {
  const seed = `drake-${pulse}-${Date.now()}`;
  return crypto.createHash('sha256').update(seed).digest('hex');
}

function deriveSigil(entropyHash) {
  return entropyHash.slice(0, 16);
}

function emitDrakeBlink(pulse, entropyHash, sigilHex) {
  const blink = {
    pulse,
    timestamp: new Date().toISOString(),
    entropy_hash: entropyHash,
    sigil_trace: sigilHex,
    glyph: "🜂",  // symbolic placeholder
    purpose: "Evolve the Drake Timeline"
  };

  const dir = path.join(__dirname, '../ipfs_index');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const filePath = path.join(dir, `drake_blink_${pulse}.json`);
  fs.writeFileSync(filePath, JSON.stringify(blink, null, 2));
}

const pulse = currentPulse();
const entropyHash = generateEntropy(pulse);
const sigilHex = deriveSigil(entropyHash);
emitDrakeBlink(pulse, entropyHash, sigilHex);
