 import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateSaleCard() {
  const { user } = useAuth();
  const [status, setStatus] = useState({});
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("fixed");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("/api/private_sale_status")
      .then((res) => res.json())
      .then(setStatus);
  }, []);

  const handleBuy = async (e) => {
    e.preventDefault();
    if (!user) {
      setResult("Please sign in first.");
      return;
    }
    const endpoint =
      type === "fixed"
        ? "/api/purchase_fixed"
        : "/api/purchase_flexible";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        wallet: user.wallet,
        email: user.email,
      }),
    });
    const data = await res.json();
    setResult(data.message || data.error || "");
  };

  return (
    <div className="private-sale-card">
      <h3>Private Sale</h3>
      <div>Token Price: ₦{status.tokenPrice}</div>
      <div>Tokens Sold: {status.totalSold}</div>
      <div>Goal: {status.goal}</div>
      <div>
        Time Left:{" "}
        {status.endTime &&
          new Date(status.endTime).toLocaleString()}
      </div>
      <form onSubmit={handleBuy}>
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
          <option value="fixed">
            BUY & EARN (GOLD) - Fixed Amount
          </option>
          <option value="flexible">
            BUY & EARN (SILVER) - Any Amount
          </option>
        </select>
        <button type="submit">Buy Now</button>
      </form>
      <div>{result}</div>
    </div>
  );
}
