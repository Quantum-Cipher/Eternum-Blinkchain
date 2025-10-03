// FILE: nexus-caller.js
const { ethers } = require('ethers');

// The Application Binary Interface (ABI) for our Nexus Core smart contract.
// This is a minimal version showing the function we intend to call.
const nexusCoreAbi = [
  "function triggerReward(string memory cid, address recipient) public"
];

// This function connects to BSC and calls the smart contract.
async function triggerReward(cid, recipientAddress) {
  console.log(`[Nexus Caller] Preparing to trigger reward for CID: ${cid}`);

  try {
    // 1. Connect to the BSC network
    const provider = new ethers.JsonRpcProvider(process.env.BSC_RPC_URL);

    // 2. Create a signer wallet from our private key
    const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
    console.log(`[Nexus Caller] Signing from wallet: ${signer.address}`);

    // 3. Create an instance of our smart contract
    const nexusCoreContract = new ethers.Contract(
      process.env.NEXUS_CORE_CONTRACT_ADDRESS,
      nexusCoreAbi,
      signer
    );

    // 4. Call the 'triggerReward' function and send the transaction
    console.log(`[Nexus Caller] Transmuting proof to value... Calling triggerReward().`);
    const tx = await nexusCoreContract.triggerReward(cid, recipientAddress);

    // 5. Wait for the transaction to be mined and confirmed
    const receipt = await tx.wait();
    console.log(`[Nexus Caller] Transmutation complete! Wealth pipeline flowed successfully.`);
    console.log(`[Nexus Caller] Transaction Hash: ${receipt.hash}`);

    return receipt.hash;
  } catch (error) {
    console.error('[Nexus Caller] A blockage in the wealth pipeline!', error.reason || error.message);
    throw new Error('Failed to trigger BSC reward.');
  }
}

module.exports = { triggerReward };
