 import { useState, useEffect } from "react";
import {
  useConnect,
  useConnectionStatus,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import { metamaskWallet } from "thirdweb/wallets";

export default function WalletConnect({ onConnect }) {
  const connect = useConnect();
  const disconnect = useDisconnect();
  const connectionStatus = useConnectionStatus();
  const activeWallet = useActiveWallet();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeWallet?.address) {
      onConnect({
        walletAddress: activeWallet.address,
        balance: 0,
        tokens: 0,
      });
    }
    // eslint-disable-next-line
  }, [activeWallet?.address]);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await connect(metamaskWallet());
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {activeWallet?.address ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>
            {activeWallet.address.slice(0, 6)}...
            {activeWallet.address.slice(-4)}
          </span>
          <button
            onClick={disconnect}
            style={{
              background: "#FF69B4",
              color: "white",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
            }}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={
            loading || connectionStatus === "connecting"
          }
          style={{
            background:
              "linear-gradient(90deg, #1DE9B6, #4d0000)",
            color: "white",
            padding: "10px 15px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "bold",
          }}
        >
          {loading || connectionStatus === "connecting"
            ? "Connecting..."
            : "Connect Wallet"}
        </button>
      )}
    </div>
  );
}
