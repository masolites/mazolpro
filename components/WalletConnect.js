 import { useEffect, useState } from "react";
import { useConnect } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

export default function WalletConnect({ onConnect }) {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  // Listen for wallet changes and update parent
  useEffect(() => {
    if (wallet && wallet.address) {
      onConnect({
        walletAddress: wallet.address,
        balance: 0,
        tokens: 0,
      });
    } else {
      onConnect(null);
    }
    // eslint-disable-next-line
  }, [wallet]);

  const connect = useConnect();

  const handleConnect = async () => {
    setLoading(true);
    try {
      const connectedWallet = await connect(
        createWallet("io.metamask"),
      );
      setWallet(connectedWallet);
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setWallet(null);
    onConnect(null);
  };

  return (
    <div>
      {wallet && wallet.address ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>
            {wallet.address.slice(0, 6)}...
            {wallet.address.slice(-4)}
          </span>
          <button
            onClick={handleDisconnect}
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
          disabled={loading}
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
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
}
