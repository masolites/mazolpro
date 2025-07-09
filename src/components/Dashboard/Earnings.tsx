import { useEffect, useState } from "react";
import { apiPost } from "../../utils/api";

export default function Earnings({
  wallet,
}: {
  wallet: string;
}) {
  const [earnings, setEarnings] = useState<any>(null);

  useEffect(() => {
    apiPost("/api/earnings", { wallet }).then(setEarnings);
  }, [wallet]);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-2">
        Earnings
      </h3>
      {earnings ? (
        <div>
          <div>Total Earnings: ₦{earnings.total || 0}</div>
          <div>
            Last Payout:{" "}
            {earnings.lastPayout
              ? new Date(
                  earnings.lastPayout,
                ).toLocaleString()
              : "—"}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
