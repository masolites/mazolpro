import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function EscrowCard() {
  const { user } = useAuth();
  const [counterparty, setCounterparty] = useState("");
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");
  const [result, setResult] = useState("");

  const handleEscrow = async (e) => {
    e.preventDefault();
    if (!user) {
      setResult("Please sign in first.");
      return;
    }
    const res = await fetch("/api/escrow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wallet: user.wallet,
        counterparty,
        amount,
        product,
      }),
    });
    const data = await res.json();
    setResult(data.message || data.error || "");
  };

  return (
    <div className="escrow-card">
      <h3>Escrow Buy & Sell</h3>
      <form onSubmit={handleEscrow}>
        <input
          type="text"
          value={counterparty}
          onChange={(e) => setCounterparty(e.target.value)}
          placeholder="Counterparty Wallet"
        />
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Product/Service"
        />
        <button type="submit">Create Escrow</button>
      </form>
      <div>{result}</div>
    </div>
  );
}
