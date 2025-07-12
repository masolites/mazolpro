 import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function MiningCard() {
  const { user } = useAuth();
  const [mining, setMining] = useState(null);
  const [result, setResult] = useState("");

  const startMining = async () => {
    if (!user) {
      setResult("Please sign in first.");
      return;
    }
    const res = await fetch("/api/mining", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet: user.wallet }),
    });
    const data = await res.json();
    setMining(data.session);
    setResult(data.message || data.error || "");
  };

  return (
    <div className="mining-card">
      <h3>Mining</h3>
      {mining ? (
        <div>
          <div>
            Speed:{" "}
            {mining.speed === 3 ? "Gold 🥇" : "Silver 🥈"}
          </div>
          <div>
            Started:{" "}
            {new Date(mining.start).toLocaleString()}
          </div>
        </div>
      ) : (
        <button onClick={startMining}>Start Mining</button>
      )}
      <div>{result}</div>
    </div>
  );
}
