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

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

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
    try {
      const res = await axios.post(
        "/api/purchase_" + type,
        {
          wallet: user.wallet,
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
    <section className="card">
      <h3 style={{ color: "var(--primary)" }}>
        Private Sale
      </h3>
      <div>
        Token Price: ₦{status?.tokenPrice ?? "0.00"}
      </div>
      <div>
        Tokens Sold: {status?.totalSold ?? 0} /{" "}
        {status?.goal ?? 0}
      </div>
      <div>
        Time Left:{" "}
        {status?.endTime
          ? new Date(status.endTime).toLocaleString()
          : "—"}
      </div>
      <form onSubmit={handlePurchase}>
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
