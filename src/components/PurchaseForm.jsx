import { useState } from "react";

export default function PurchaseForm({ wallet }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("wallet");
  const [proof, setProof] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    let endpoint = "";
    let body = { amount, wallet };

    if (method === "wallet") {
      endpoint = "/api/purchase_fixed";
    } else if (method === "flutterwave") {
      endpoint = "/api/deposit";
      body = { ...body, type: "flutterwave" };
    } else if (method === "manual") {
      endpoint = "/api/deposit";
      body = { ...body, type: "manual", proof };
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.error) setResult(data.error);
      else setResult(data.message || "Success!");
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
      }}
    >
      <h3 style={{ color: "#FFA726" }}>Buy MAZOL Tokens</h3>
      <div>
        <label>Amount (₦):</label>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
      </div>
      <div>
        <label>Payment Method:</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        >
          <option value="wallet">Platform Wallet</option>
          <option value="flutterwave">Flutterwave</option>
          <option value="manual">
            Manual Bank Deposit
          </option>
        </select>
      </div>
      {method === "manual" && (
        <div>
          <label>Upload Proof of Payment:</label>
          <input
            type="text"
            placeholder="Paste payment reference or link"
            value={proof || ""}
            onChange={(e) => setProof(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
            required
          />
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        style={{ width: "100%", marginTop: 8 }}
      >
        {loading ? "Processing..." : "Buy Tokens"}
      </button>
      {result && (
        <div style={{ marginTop: 12, color: "#1DE9B6" }}>
          {result}
        </div>
      )}
    </form>
  );
}
