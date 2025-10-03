import { ethers } from "ethers";
import { useState } from "react";
import { NEXUS_ADDRESS } from "./config";

function TriggerRewardForm() {
  const [tier, setTier] = useState(1);
  async function distribute() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(NEXUS_ADDRESS, ["function distributeReward(address,uint8)"], signer);
    await contract.distributeReward(await signer.getAddress(), tier);
  }
  return <button onClick={distribute}>Claim Tier {tier} Reward</button>;
}

export default TriggerRewardForm;
