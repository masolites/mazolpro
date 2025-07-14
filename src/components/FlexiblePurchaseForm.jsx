import { useState } from "react";

export default function FlexiblePurchaseForm({ wallet }) {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/purchase_flex", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, wallet }),
      });
      const data = await res.json();
      if (data.error) setResult(data.error);
      else
        setResult(
          data.message || "Flexible purchase successful!",
        );
    } catch (err) {
      setResult("An error occurred.");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handlePurchase}
      style={{
        background: "#2d0000",
        padding: 24,
        borderRadius: 12,
        marginTop: 24,
      }}
    >
      <h3 style={{ color: "#1DE9B6" }}>
        Buy MAZOL Tokens (Flexible)
      </h3>
      <div>
        <label>Amount (₦):</label>
        <input
          type="number"
          min="200"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{ width: "100%", marginTop: 8 }}
      >
        {loading ? "Processing..." : "Buy Flex"}
      </button>
      {result && (
        <div style={{ marginTop: 12, color: "#FFA726" }}>
          {result}
        </div>
      )}
    </form>
  );
}
