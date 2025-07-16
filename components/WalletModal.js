 import { useState } from "react";
import { useConnect } from "thirdweb/react";
import {
  createWallet,
  embeddedWallet,
} from "thirdweb/wallets";

export default function WalletModal({ onWallet, onClose }) {
  const connect = useConnect();
  const [showCreate, setShowCreate] = useState(false);
  const [pin, setPin] = useState("");
  const [pin2, setPin2] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Connect MetaMask
  const handleConnectMetaMask = async () => {
    setLoading(true);
    setError("");
    try {
      const wallet = await connect(
        createWallet("io.metamask"),
      );
      onWallet(wallet);
    } catch (e) {
      setError("MetaMask connection failed or cancelled.");
    }
    setLoading(false);
  };

  // Create Embedded Wallet
  const handleCreateWallet = async (e) => {
    e.preventDefault();
    setError("");
    if (!pin || !pin2 || !email) {
      setError("All fields are required.");
      return;
    }
    if (pin !== pin2) {
      setError("PINs do not match.");
      return;
    }
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setError("PIN must be exactly 4 digits.");
      return;
    }
    setLoading(true);
    try {
      const wallet = await connect(
        embeddedWallet({ email, password: pin }),
      );
      onWallet(wallet);
    } catch (e) {
      setError("Wallet creation failed.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff5e1",
          color: "#4d0000",
          borderRadius: "15px",
          padding: "30px",
          minWidth: "320px",
          maxWidth: "90vw",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "transparent",
            color: "#4d0000",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            fontWeight: "bold",
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          &times;
        </button>
        {!showCreate ? (
          <>
            <h2 style={{ textAlign: "center" }}>
              Get Started
            </h2>
            <p style={{ textAlign: "center" }}>
              Please connect MetaMask or create a new wallet
              to continue.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={handleConnectMetaMask}
                disabled={loading}
                style={{
                  background: "#1DE9B6",
                  color: "#4d0000",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                {loading
                  ? "Connecting..."
                  : "Connect MetaMask"}
              </button>
              <button
                onClick={() => setShowCreate(true)}
                disabled={loading}
                style={{
                  background: "#FF69B4",
                  color: "white",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Create Wallet
              </button>
            </div>
            {error && (
              <div
                style={{
                  color: "#FF69B4",
                  marginTop: "15px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}
          </>
        ) : (
          <>
            <h2 style={{ textAlign: "center" }}>
              Create Wallet
            </h2>
            <form
              onSubmit={handleCreateWallet}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <input
                type="email"
                placeholder="Email (for recovery)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
              <input
                type="password"
                placeholder="4-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
              <input
                type="password"
                placeholder="Confirm PIN"
                value={pin2}
                onChange={(e) => setPin2(e.target.value)}
                maxLength={4}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "#1DE9B6",
                  color: "#4d0000",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                {loading ? "Creating..." : "Create Wallet"}
              </button>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                style={{
                  background: "#FF69B4",
                  color: "white",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
            </form>
            {error && (
              <div
                style={{
                  color: "#FF69B4",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
