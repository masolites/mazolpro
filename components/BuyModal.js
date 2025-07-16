import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";

export default function BuyModal({ onClose }) {
  const account = useActiveAccount();
  const [mode, setMode] = useState("fixed"); // "fixed" or "flex"
  const [amount, setAmount] = useState(
    mode === "fixed" ? 1000 : "",
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    if (!account) {
      setMessage("Please connect your wallet first.");
      return;
    }
    if (
      mode === "flex" &&
      (!amount || Number(amount) < 200)
    ) {
      setMessage("Minimum flexible amount is ₦200.");
      return;
    }
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/mazol-purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        walletAddress: account.address,
        nairaAmount: Number(amount),
        mode,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(
        "Tokens will be sent to your wallet after payment verification.",
      );
    } else {
      setMessage(data.error || "Token transfer failed.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: 24,
        borderRadius: 12,
        maxWidth: 400,
        margin: "40px auto",
      }}
    >
      <button onClick={onClose} style={{ float: "right" }}>
        ✖️
      </button>
      <h2>Buy MAZOL MZLx Tokens</h2>
      <div>
        <label>
          <input
            type="radio"
            checked={mode === "fixed"}
            onChange={() => {
              setMode("fixed");
              setAmount(1000);
            }}
          />
          Fixed (₦1000)
        </label>
        <label style={{ marginLeft: 16 }}>
          <input
            type="radio"
            checked={mode === "flex"}
            onChange={() => {
              setMode("flex");
              setAmount("");
            }}
          />
          Flexible (Min ₦200)
        </label>
      </div>
      <input
        type="number"
        value={amount}
        min={mode === "fixed" ? 1000 : 200}
        onChange={(e) => setAmount(e.target.value)}
        disabled={mode === "fixed"}
        style={{ width: "100%", margin: "16px 0" }}
      />
      <button onClick={handleBuy} disabled={loading}>
        {loading ? "Processing..." : "Buy with Flutterwave"}
      </button>
      {message && (
        <div style={{ marginTop: 12 }}>{message}</div>
      )}
    </div>
  );
}
