 // pages/index.js

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthCard from "../components/AuthCard";

export default function Home() {
  const { user, wallet, setPinAndEmail, loading } =
    useAuth();
  const [result, setResult] = useState("");

  // Example: handle deposit, mining, purchase, withdraw, etc.
  // All actions use wallet address as identity

  if (loading) return <div>Loading...</div>;

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "0 auto",
        padding: 24,
      }}
    >
      <h1>Mazol Pro</h1>
      <h2>E-commerce & Blockchain</h2>
      <p>
        Mazol-Pro is a Blockchain supported Platform
        promoting a Better Society Together by offering
        Trusted Systems, Goods & Services to people
      </p>
      {!wallet && (
        <AuthCard
          onWalletConnect={() => {}} // handled by thirdweb
          onSetPin={async (pin, email) => {
            const res = await setPinAndEmail(pin, email);
            setResult(res.message || res.error);
          }}
        />
      )}
      {wallet && user && (
        <>
          <div style={{ margin: "16px 0" }}>
            <strong>Wallet:</strong> {wallet}
            <br />
            <strong>Balance:</strong> ₦{user.nairaBalance}
            <br />
            <strong>Email (optional):</strong>{" "}
            {user.email || "Not set"}
          </div>
          {/* ...rest of your UI for deposit, mining, purchase, withdraw, etc. */}
          {result && (
            <div
              style={{ marginTop: 16, color: "#1DE9B6" }}
            >
              {result}
            </div>
          )}
        </>
      )}
    </div>
  );
}
