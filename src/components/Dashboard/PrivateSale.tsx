import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../utils/api";

export default function PrivateSale({
  wallet,
}: {
  wallet: string;
}) {
  const [status, setStatus] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("fixed");
  const [result, setResult] = useState("");

  useEffect(() => {
    apiGet("/api/private_sale_status").then(setStatus);
  }, []);

  async function handlePurchase(e: React.FormEvent) {
    e.preventDefault();
    setResult("");
    const res = await apiPost("/api/purchase_" + type, {
      amount,
      wallet,
    });
    setResult(res.message || res.error || "");
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-2">
        Private Sale
      </h3>
      <div>
        Token Price: ₦{status?.tokenPrice || "0.00"}
      </div>
      <div>
        Tokens Sold:{" "}
        {status?.totalSold?.toLocaleString() || "0"}
      </div>
      <div>
        Goal: {status?.goal?.toLocaleString() || "0"}
      </div>
      <div>
        Time Left:{" "}
        {status?.endTime
          ? new Date(status.endTime).toLocaleString()
          : "—"}
      </div>
      <form
        onSubmit={handlePurchase}
        className="flex flex-col gap-2 mt-2"
      >
        <input
          className="input"
          type="number"
          min="1"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          className="input"
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
        <button className="btn-primary" type="submit">
          Buy Now
        </button>
      </form>
      {result && (
        <div className="mt-2 text-blue-600">{result}</div>
      )}
    </div>
  );
}
