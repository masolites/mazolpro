import { useState } from "react";
import { useConnect } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

export default function MetaMaskConnect({ onConnect }) {
  const connect = useConnect();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConnect = async () => {
    setLoading(true);
    setError("");
    try {
      const connectedWallet = await connect(
        createWallet("io.metamask"),
      );
      setWallet(connectedWallet);
      if (onConnect) {
        onConnect(connectedWallet);
      }
    } catch (e) {
      setError("MetaMask connection failed or cancelled.");
    }
    setLoading(false);
  };

  const handleDisconnect = () => {
    setWallet(null);
    if (onConnect) {
      onConnect(null);
    }
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
          {loading ? "Connecting..." : "Connect MetaMask"}
        </button>
      )}
      {error && (
        <div
          style={{ color: "#FF69B4", marginTop: "10px" }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
