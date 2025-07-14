import { useEffect, useState } from "react";

export default function PlatformWalletCard({ wallet }) {
  const [balance, setBalance] = useState(0);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch platform wallet balance
  useEffect(() => {
    async function fetchBalance() {
      if (!wallet) return;
      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "getUser",
            user: wallet,
          }),
        });
        const data = await res.json();
        setBalance(data.user?.nairaBalance || 0);
      } catch {
        setBalance(0);
      }
    }
    fetchBalance();
  }, [wallet, result]);

  // Deposit to platform wallet (via Flutterwave/manual)
  const handleDeposit = async (type) => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet,
          amount: 1000,
          type,
        }), // Example: deposit ₦1000
      });
      const data = await res.json();
      setResult(data.message || data.error || "");
    } catch {
      setResult("Deposit failed.");
    }
    setLoading(false);
  };

  // Buy tokens from platform wallet
  const handleBuyFromWallet = async (type) => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "platform",
          wallet,
          amount: 1000,
        }), // Example: buy ₦1000 tokens
      });
      const data = await res.json();
      setResult(data.message || data.error || "");
    } catch {
      setResult("Purchase failed.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#2d0000",
        padding: 24,
        borderRadius: 12,
        marginTop: 24,
      }}
    >
      <h3 style={{ color: "#FFA726" }}>Platform Wallet</h3>
      <div style={{ marginBottom: 8 }}>
        <strong>Balance:</strong> ₦{balance}
      </div>
      <button
        onClick={() => handleDeposit("flutterwave")}
        disabled={loading}
        style={{ marginRight: 8 }}
      >
        Deposit ₦1000 (Flutterwave)
      </button>
      <button
        onClick={() => handleDeposit("manual")}
        disabled={loading}
      >
        Deposit ₦1000 (Manual)
      </button>
      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => handleBuyFromWallet("platform")}
          disabled={loading}
        >
          Buy Tokens from Platform Wallet (₦1000)
        </button>
      </div>
      {result && (
        <div style={{ marginTop: 12, color: "#1DE9B6" }}>
          {result}
        </div>
      )}
    </div>
  );
}
