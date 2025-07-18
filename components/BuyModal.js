 // components/BuyModal.js
import { useActiveAccount } from "thirdweb/react";
import { useState } from "react";
import Script from "next/script";

export default function BuyModal({ onClose }) {
  const account = useActiveAccount();
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePurchase = async () => {
    if (!account) {
      setMessage("Connect your wallet first");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: account.address,
          amount,
          email,
        }),
      });
      const data = await response.json();
      setMessage(data.message || "Purchase initiated");
    } catch (error) {
      setMessage("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.flutterwave.com/v3.js" />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            maxWidth: "500px",
            width: "100%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Purchase MZLx Tokens</h2>
          <div style={{ margin: "1rem 0" }}>
            <label>Amount (NGN)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ margin: "1rem 0" }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          {message && (
            <p
              style={{
                color: message.includes("failed")
                  ? "red"
                  : "green",
              }}
            >
              {message}
            </p>
          )}
          <button
            onClick={handlePurchase}
            disabled={loading}
            style={{
              padding: "12px 24px",
              background: loading ? "#ccc" : "#3182ce",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            {loading ? "Processing..." : "Confirm Purchase"}
          </button>
        </div>
      </div>
    </>
  );
}
