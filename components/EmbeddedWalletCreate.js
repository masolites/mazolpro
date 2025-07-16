import { useState } from "react";
import { useConnect } from "thirdweb/react";
import { embeddedWallet } from "thirdweb/wallets";

export default function EmbeddedWalletCreate({ onCreate }) {
  const connect = useConnect();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [pin2, setPin2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !pin || !pin2) {
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
      if (onCreate) {
        onCreate(wallet);
      }
    } catch (e) {
      setError("Embedded wallet creation failed.");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleCreate}
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
      {error && (
        <div
          style={{ color: "#FF69B4", marginTop: "10px" }}
        >
          {error}
        </div>
      )}
    </form>
  );
}
