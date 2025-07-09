import { useEffect, useState } from "react";
import { apiPost } from "../../utils/api";

export default function Wallet({
  wallet,
}: {
  wallet: string;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    apiPost("/api/auth", {
      action: "getUser",
      user: wallet,
    }).then((res) => setUser(res.user));
  }, [wallet]);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-2">Wallet</h3>
      {user ? (
        <div>
          <div>
            Naira Balance: ₦{user.nairaBalance || 0}
          </div>
          <div>USDT Balance: {user.usdtBalance || 0}</div>
          <div>Wallet Address: {user.wallet}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
