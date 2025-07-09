import { useState } from "react";
import { apiPost } from "../../utils/api";

export default function Mining({
  wallet,
}: {
  wallet: string;
}) {
  const [status, setStatus] = useState("");
  const [timer, setTimer] = useState("00:00:00");
  const [speed, setSpeed] = useState("—");

  async function startMining() {
    setStatus("");
    const res = await apiPost("/api/mining", { wallet });
    setStatus(res.message || res.error || "");
    if (res.session) {
      setSpeed(
        res.session.speed === 3 ? "Gold 🥇" : "Silver 🥈",
      );
      const start = new Date(res.session.start).getTime();
      function updateMiningTimer() {
        const now = Date.now();
        let diff = Math.max(0, now - start);
        const hours = String(
          Math.floor(diff / 3600000),
        ).padStart(2, "0");
        const mins = String(
          Math.floor((diff % 3600000) / 60000),
        ).padStart(2, "0");
        const secs = String(
          Math.floor((diff % 60000) / 1000),
        ).padStart(2, "0");
        setTimer(`${hours}:${mins}:${secs}`);
      }
      updateMiningTimer();
      setInterval(updateMiningTimer, 1000);
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-2">Mining</h3>
      <div>Session Time: {timer}</div>
      <div>Speed: {speed}</div>
      <button
        className="btn-primary mt-2"
        onClick={startMining}
      >
        Start Mining
      </button>
      {status && (
        <div className="mt-2 text-blue-600">{status}</div>
      )}
    </div>
  );
}
