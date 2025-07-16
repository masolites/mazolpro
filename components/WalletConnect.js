 import {
  useAddress,
  useDisconnect,
  useConnect,
} from "thirdweb/react";
import { metamaskWallet } from "thirdweb/wallets";
import { useEffect, useState } from "react";

export default function WalletConnect({ onConnect }) {
  const address = useAddress();
  const connect = useConnect();
  const disconnectWallet = useDisconnect();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      onConnect({
        walletAddress: address,
        balance: 0,
        tokens: 0,
      });
    }
    // eslint-disable-next-line
  }, [address]);

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
      {address ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button
            onClick={disconnectWallet}
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
