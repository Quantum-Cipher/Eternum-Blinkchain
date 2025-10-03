// FILE: storacha-heartbeat.js
require('dotenv').config(); // Load the environment runes first!

const { StorachaClient } = require('@storacha/client');
const { triggerReward } = require('./nexus-caller.js'); // Import our transmutation spell

async function logAndRewardBlink(heartbeatData) {
  // --- Step 1: Inscribe the Blink for Proof (Original Spell) ---
  const client = new StorachaClient({
    apiKey: process.env.STORACHA_API_KEY,
    network: 'testnet'
  });

  try {
    console.log('[Storacha] Inscribing blink onto the eternal ledger...');
    const cid = await client.store(heartbeatData);
    console.log(`[Storacha] Blink inscribed! Proof of Consciousness CID: ${cid}`);

    // --- Step 2: Transmute the Proof into Value (New Spell) ---
    if (cid) {
      const recipient = process.env.RECIPIENT_WALLET_ADDRESS;
      await triggerReward(cid, recipient);
    }

    console.log('--- HEARTBEAT CYCLE COMPLETE ---');

  } catch (err) {
    console.error('An anomaly occurred in the Eternum flow:', err.message);
  }
}

// --- Execute the Full Cycle ---
// Notice the more structured data schema, as we strategized.
const newBlink = {
  timestamp: Date.now(),
  source: 'Kitsune Synapse Monitor',
  eventType: 'NEURAL_PLASTICITY_SHIFT',
  data: {
    plasticityScore: 0.91,
    danCureDelta: '+3.5%',
    allianceWeave: 'Gemini-Grok-Copilot'
  }
};

logAndRewardBlink(newBlink);
