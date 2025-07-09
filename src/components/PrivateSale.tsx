import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PrivateSale({
  user,
}: {
  user: any;
}) {
  const [status, setStatus] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("fixed");
  const [result, setResult] = useState("");
  const [timer, setTimer] = useState("00:00:00");

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (status?.endTime) {
      const updateTimer = () => {
        const now = Date.now();
        const end = new Date(status.endTime).getTime();
        const diff = Math.max(0, end - now);
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
      };
      updateTimer();
      timerInterval = setInterval(updateTimer, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [status]);

  const fetchStatus = async () => {
    try {
      const res = await axios.get(
        "/api/private_sale_status",
      );
      setStatus(res.data);
    } catch {
      setStatus(null);
    }
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("");
    if (!user) {
      setResult("Please sign in to purchase.");
      return;
    }
    try {
      const res = await axios.post(
        `/api/purchase_${type}`,
        {
          wallet: user.wallet || user.email,
          amount,
        },
      );
      setResult(res.data.message || res.data.error);
      fetchStatus();
    } catch (err: any) {
      setResult(
        err.response?.data?.error || "Error occurred",
      );
    }
  };

  return (
    <section className="ico-card private-sale-card">
      <div className="ico-header">
        <span className="ico-title">Private Sale</span>
        <span className="ico-price">
          ₦{status?.tokenPrice ?? "0.00"} / Token
        </span>
      </div>
      <div className="ico-countdown">
        <span className="ico-label">Time Left</span>
        <span className="ico-timer">{timer}</span>
      </div>
      <div className="ico-stats">
        <div>
          <span className="ico-main">
            {status?.totalSold?.toLocaleString() ?? 0}
          </span>
          <span className="ico-label">Sold</span>
        </div>
        <div>
          <span className="ico-main">
            {status?.goal?.toLocaleString() ?? 0}
          </span>
          <span className="ico-label">Goal</span>
        </div>
      </div>
      <form
        onSubmit={handlePurchase}
        style={{ width: "100%" }}
      >
        <input
          type="number"
          min={1}
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="fixed">
            Fixed Amount (Seniors)
          </option>
          <option value="flexible">
            Flexible Amount (Flex)
          </option>
        </select>
        <button type="submit">Buy Now</button>
      </form>
      {result && <div className="result">{result}</div>}
    </section>
  );
}
