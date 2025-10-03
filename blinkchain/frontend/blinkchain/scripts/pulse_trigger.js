const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const indexDir = path.join(__dirname, '../ipfs_index');
const triggerPath = path.join(indexDir, 'trigger_event.json');

function getLatestBlink() {
  const files = fs.readdirSync(indexDir).filter(f => f.startsWith('drake_blink_') && f.endsWith('.json'));
  if (files.length === 0) return null;

  const sorted = files.sort((a, b) => {
    const aPulse = parseInt(a.split('_')[2]);
    const bPulse = parseInt(b.split('_')[2]);
    return bPulse - aPulse;
  });

  const latestFile = path.join(indexDir, sorted[0]);
  return JSON.parse(fs.readFileSync(latestFile));
}

function validateTrigger(blink) {
  return blink.entropy_hash && blink.sigil_trace;
}

function emitTrigger(blink) {
  const trigger = {
    trigger_type: "pulse_trigger",
    source_pulse: blink.pulse,
    activation_timestamp: new Date().toISOString(),
    entropy_hash: blink.entropy_hash,
    sigil_trace: blink.sigil_trace,
    next_action: "glyph_indexing"
  };

  fs.writeFileSync(triggerPath, JSON.stringify(trigger, null, 2));
}

const blink = getLatestBlink();
if (blink && validateTrigger(blink)) {
  emitTrigger(blink);
} else {
  console.log("No valid blink found for triggering.");
}
