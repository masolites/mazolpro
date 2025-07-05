 import { useState, useEffect } from "react";
import {
  useConnect,
  useConnectionStatus,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

export default function WalletConnect({
  userData,
  updateUserData,
}) {
  const connectionStatus = useConnectionStatus();
  const connect = useConnect();
  const [address, setAddress] = useState(null);

  // Listen for wallet connection
  useEffect(() => {
    if (connectionStatus === "connected") {
      // Get the address from the wallet provider
      // For demo, we'll just set a placeholder
      // In production, use thirdweb's wallet API to get the address
      // e.g., useActiveAccount() from thirdweb/react if available
      setAddress("0xYourWalletAddress"); // Replace with actual address logic
      updateUserData({ address: "0xYourWalletAddress" });
    }
  }, [connectionStatus, updateUserData]);

  return (
    <div style={styles.container}>
      {connectionStatus === "connected" && address ? (
        <div style={styles.connected}>
          <p style={styles.address}>
            {address.substring(0, 6)}...
            {address.substring(address.length - 4)}
          </p>
          <p style={styles.status}>Connected ✅</p>
        </div>
      ) : (
        <button
          onClick={() =>
            connect(createWallet("io.metamask"))
          }
          style={styles.button}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#8e44ad",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "30px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600",
    width: "100%",
    boxShadow: "0 4px 6px rgba(142, 68, 173, 0.2)",
  },
  connected: {
    backgroundColor: "#27ae60",
    color: "white",
    padding: "10px 15px",
    borderRadius: "30px",
    textAlign: "center",
  },
  address: {
    fontSize: "14px",
    margin: "0 0 5px 0",
  },
  status: {
    fontSize: "12px",
    margin: 0,
  },
};
