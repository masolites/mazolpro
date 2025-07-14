 // src/components/AuthCard.jsx

import { ConnectButton } from "thirdweb/react";
import { useState } from "react";

export default function AuthCard({
  onWalletConnect,
  onSetPin,
}) {
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div
      style={{
        background: "#fff5e1",
        borderRadius: 18,
        boxShadow: "0 4px 16px 0 #e9d5ff",
        padding: "2rem 1.5rem",
        minWidth: 300,
        maxWidth: 350,
        textAlign: "center",
        color: "#800000",
        margin: "0 auto",
      }}
    >
      <h3 style={{ color: "#FF69B4", marginBottom: 8 }}>
        Connect or Create Wallet
      </h3>
      <p style={{ color: "#4d0000", marginBottom: 24 }}>
        Connect your wallet to access all features.
        <br />
        Set a 4-digit PIN for withdrawals and transfers.
        <br />
        (Email is optional, for support only)
      </p>
      <ConnectButton onConnect={onWalletConnect} />
      <form
        style={{ marginTop: 24 }}
        onSubmit={(e) => {
          e.preventDefault();
          onSetPin(pin, email);
        }}
      >
        <input
          value={pin}
          onChange={(e) =>
            setPin(e.target.value.replace(/\D/g, ""))
          }
          placeholder="4-digit PIN"
          type="password"
          maxLength={4}
          style={{ marginRight: 8, marginBottom: 8 }}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          type="email"
          style={{ marginRight: 8, marginBottom: 8 }}
        />
        <button
          type="submit"
          style={{
            background: "#1DE9B6",
            color: "#4d0000",
            border: "none",
            borderRadius: 12,
            padding: "0.5rem 1.5rem",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px #e9d5ff",
          }}
        >
          Set PIN / Email
        </button>
      </form>
    </div>
  );
}
