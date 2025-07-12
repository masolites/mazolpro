import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function DepositCard() {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("flutterwave");
  const [proof, setProof] = useState("");
  const [result, setResult] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!user) {
      setResult("Please sign in first.");
      return;
    }
    const res = await fetch("/api/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        amount,
        wallet: user.wallet,
        proof,
      }),
    });
    const data = await res.json();
    setResult(data.message || data.error || "");
  };

  return (
    <div className="deposit-card">
      <h3>Deposit</h3>
      <form onSubmit={handleDeposit}>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="flutterwave">Flutterwave</option>
          <option value="manual">Manual</option>
          <option value="usdt">USDT</option>
        </select>
        {type === "manual" && (
          <input
            type="text"
            value={proof}
            onChange={(e) => setProof(e.target.value)}
            placeholder="Proof of payment"
          />
        )}
        <button type="submit">Deposit</button>
      </form>
      <div>{result}</div>
    </div>
  );
}
