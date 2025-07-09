import { useState } from "react";
import { apiPost } from "../../utils/api";

export default function Withdraw({
  wallet,
}: {
  wallet: string;
}) {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  async function handleWithdraw() {
    setResult("");
    const res = await apiPost("/api/withdraw", {
      wallet,
      amount,
    });
    setResult(res.message || res.error || "");
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-2">
        Withdraw
      </h3>
      <input
        className="input"
        type="number"
        min="1"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="btn-primary mt-2"
        onClick={handleWithdraw}
      >
        Withdraw
      </button>
      {result && (
        <div className="mt-2 text-blue-600">{result}</div>
      )}
    </div>
  );
}
