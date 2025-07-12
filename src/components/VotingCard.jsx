import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function VotingCard() {
  const { user } = useAuth();
  const [price, setPrice] = useState("");
  const [result, setResult] = useState("");

  const handleVote = async (e) => {
    e.preventDefault();
    if (!user) {
      setResult("Please sign in first.");
      return;
    }
    const res = await fetch("/api/voting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price, wallet: user.wallet }),
    });
    const data = await res.json();
    setResult(data.message || data.error || "");
  };

  return (
    <div className="voting-card">
      <h3>Voting</h3>
      <form onSubmit={handleVote}>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g. 0.15"
        />
        <button type="submit">Vote</button>
      </form>
      <div>{result}</div>
    </div>
  );
}
