echo 'require("dotenv").config();
const { ethers } = require("ethers");
async function triggerReward() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.CALLER_PRIVATE_KEY, provider);
  const nexus = new ethers.Contract(process.env.NEXUS_ADDRESS, ["function distributeReward(address,uint8)"], wallet);
  const tx = await nexus.distributeReward(wallet.address, 1);
  console.log("TX:", tx.hash);
}
triggerReward().catch(console.error);' > scripts/trigger-reward.js
chmod +x scripts/trigger-reward.js
