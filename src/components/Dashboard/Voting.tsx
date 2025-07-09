import { useState } from "react";
import { apiPost } from "../../utils/api";

export default function Voting({
  wallet,
}: {
  wallet: string;
}) {
  const [price, setPrice] = useState("");
  const [result, setResult] = useState("");

  async function handleVote(e: React.FormEvent) {
    e.preventDefault();
    setResult("");
    const res = await apiPost("/api/voting", {
      price,
      wallet,
    });
    setResult(res.message || res.error || "");
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-2">Voting</h3>
      <form
        onSubmit={handleVote}
        className="flex flex-col gap-2"
      >
        <input
          className="input"
          type="number"
          step="0.01"
          placeholder="Vote for next price (e.g. 0.15)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button className="btn-primary" type="submit">
          Vote
        </button>
      </form>
      {result && (
        <div className="mt-2 text-blue-600">{result}</div>
      )}
    </div>
  );
}
