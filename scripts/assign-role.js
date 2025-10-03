require("dotenv").config();
const { ethers } = require("ethers");

async function assignRole() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const nexus = new ethers.Contract(process.env.NEXUS_ADDRESS, ["function grantRole(bytes32,address)"], wallet);
  const tx = await nexus.grantRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("CALLER_ROLE")), process.env.CALLER_ADDRESS);
  console.log("CALLER_ROLE TX:", tx.hash);
}

assignRole().catch(console.error);
