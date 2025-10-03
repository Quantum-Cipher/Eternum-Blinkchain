require("dotenv").config();
const { ethers } = require("ethers");

async function deploy() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const YUKAN = await ethers.getContractFactory("YUKAN", wallet);
  const yukan = await YUKAN.deploy(1000000);
  await yukan.deployed();
  console.log("YUKAN:", yukan.address);
  const NexusCoreV3 = await ethers.getContractFactory("NexusCoreV3", wallet);
  const nexus = await NexusCoreV3.deploy(yukan.address);
  await nexus.deployed();
  console.log("NexusCoreV3:", nexus.address);
  await nexus.grantRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("CALLER_ROLE")), process.env.CALLER_ADDRESS);
  console.log("CALLER_ROLE assigned");
  console.log(`Update frontend/src/config.js: NEXUS_ADDRESS=${nexus.address}, YUKAN_ADDRESS=${yukan.address}`);
}

deploy().catch(console.error);
