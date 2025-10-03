echo 'require("dotenv").config();
const { ethers } = require("ethers");
async function fetchEvents() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const nexus = new ethers.Contract(process.env.NEXUS_ADDRESS, ["event RewardDistributed(address,uint256,uint8)"], provider);
  const events = await nexus.queryFilter("RewardDistributed");
  console.log("Events:", events);
}
fetchEvents().catch(console.error);' > scripts/fetch-events.js
chmod +x scripts/fetch-events.js
