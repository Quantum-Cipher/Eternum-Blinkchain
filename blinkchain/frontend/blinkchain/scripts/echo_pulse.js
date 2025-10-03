const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const indexDir = path.join(__dirname, '../ipfs_index');
const echoPath = path.join(indexDir, 'echo_pulse.json');

function getEntropyHashes() {
  const files = fs.readdirSync(indexDir).filter(f => f.startsWith('pulse_') && f.endsWith('.json'));
  const hashes = [];

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(indexDir, file)));
    if (data.entropy_hash) hashes.push(data.entropy_hash);
  }

  return hashes;
}

function deriveEchoEntropy(hashes) {
  const combined = hashes.join('');
  return crypto.createHash('sha256').update(combined).digest('hex');
}

function deriveSigilTrace(echoEntropy) {
  return echoEntropy.slice(0, 16); // symbolic trace
}

function emitEchoPulse(hashes, echoEntropy, sigilTrace) {
  const echo = {
    echo_entropy: echoEntropy,
    pulse_count: hashes.length,
    timestamp: new Date().toISOString(),
    sigil_trace: sigilTrace
  };

  fs.writeFileSync(echoPath, JSON.stringify(echo, null, 2));
}

const hashes = getEntropyHashes();
const echoEntropy = deriveEchoEntropy(hashes);
const sigilTrace = deriveSigilTrace(echoEntropy);
emitEchoPulse(hashes, echoEntropy, sigilTrace);
