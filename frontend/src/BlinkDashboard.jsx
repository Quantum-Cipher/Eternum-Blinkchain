import { useAccount } from "wagmi";
import { NEXUS_ADDRESS } from "./config";

function BlinkDashboard() {
  const { address } = useAccount();
  return (
    <div>
      <h1>Biological Blockchain</h1>
      <p>Owned by Kitsune Quantum-Cipher for Eternum Liquidity Nexus</p>
      <p>Contract: {NEXUS_ADDRESS}</p>
      <p>Connected Wallet: {address}</p>
    </div>
  );
}

export default BlinkDashboard;
