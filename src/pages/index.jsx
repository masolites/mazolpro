 import { useState } from "react";
import { ConnectButton } from "thirdweb/react";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [user, setUser] = useState(null);
  const [result, setResult] = useState("");

  // Fetch or create user on wallet connect
  const handleConnect = async (address) => {
    setWallet(address);
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet: address }),
    });
    const data = await res.json();
    setUser(data.user);
  };

  // Deposit
  const handleDeposit = async (amount, method) => {
    const res = await fetch("/api/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet, amount, method }),
    });
    const data = await res.json();
    setResult(data.message || data.error);
    if (data.message) refreshUser();
  };

  // Mining
  const handleMining = async () => {
    const res = await fetch("/api/mining", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet }),
    });
    const data = await res.json();
    setResult(data.message || data.error);
  };

  // Fixed Purchase (MLM)
  const handleFixedPurchase = async (amount, referrer) => {
    const res = await fetch("/api/purchase_fixed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet, amount, referrer }),
    });
    const data = await res.json();
    setResult(data.message || data.error);
    if (data.message) refreshUser();
  };

  // Flexible Purchase (Affiliate)
  const handleFlexPurchase = async (amount, affiliate) => {
    const res = await fetch("/api/purchase_flex", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet, amount, affiliate }),
    });
    const data = await res.json();
    setResult(data.message || data.error);
    if (data.message) refreshUser();
  };

  // Withdraw
  const handleWithdraw = async (amount, pin) => {
    const res = await fetch("/api/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet, amount, pin }),
    });
    const data = await res.json();
    setResult(data.message || data.error);
    if (data.message) refreshUser();
  };

  // Set Email/PIN
  const handleSetEmailPin = async (email, pin) => {
    const res = await fetch("/api/user_update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet, email, pin }),
    });
    const data = await res.json();
    setResult(data.message || data.error);
    if (data.message) refreshUser();
  };

  // Refresh user data
  const refreshUser = async () => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet }),
    });
    const data = await res.json();
    setUser(data.user);
  };

  // Simple forms for demo
  const [depositAmount, setDepositAmount] = useState("");
  const [depositMethod, setDepositMethod] =
    useState("manual");
  const [mining, setMining] = useState(false);
  const [fixedAmount, setFixedAmount] = useState("");
  const [fixedReferrer, setFixedReferrer] = useState("");
  const [flexAmount, setFlexAmount] = useState("");
  const [flexAffiliate, setFlexAffiliate] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawPin, setWithdrawPin] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "0 auto",
        padding: 24,
      }}
    >
      <h1>Mazol Pro</h1>
      <h2>E-commerce & Blockchain</h2>
      <p>
        Mazol-Pro is a Blockchain supported Platform
        promoting a Better Society Together by offering
        Trusted Systems, Goods & Services to people
      </p>
      <ConnectButton onConnect={handleConnect} />
      {user && (
        <>
          <div style={{ margin: "16px 0" }}>
            <strong>Wallet:</strong> {user.wallet}
            <br />
            <strong>Balance:</strong> ₦{user.nairaBalance}
          </div>

          {/* Set Email and PIN */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSetEmailPin(email, pin);
            }}
            style={{ marginBottom: 16 }}
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              style={{ marginRight: 8 }}
            />
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="4-digit PIN"
              type="password"
              style={{ marginRight: 8 }}
            />
            <button type="submit">Set Email/PIN</button>
          </form>

          {/* Deposit */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDeposit(depositAmount, depositMethod);
            }}
            style={{ marginBottom: 16 }}
          >
            <input
              value={depositAmount}
              onChange={(e) =>
                setDepositAmount(e.target.value)
              }
              placeholder="Deposit Amount"
              style={{ marginRight: 8 }}
            />
            <select
              value={depositMethod}
              onChange={(e) =>
                setDepositMethod(e.target.value)
              }
              style={{ marginRight: 8 }}
            >
              <option value="manual">Manual</option>
              <option value="flutterwave">
                Flutterwave
              </option>
            </select>
            <button type="submit">Deposit</button>
          </form>

          {/* Mining */}
          <button
            onClick={() => {
              setMining(true);
              handleMining();
            }}
            style={{ marginBottom: 16 }}
          >
            {mining ? "Mining..." : "Start Mining"}
          </button>

          {/* Fixed Purchase (MLM) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFixedPurchase(
                fixedAmount,
                fixedReferrer,
              );
            }}
            style={{ marginBottom: 16 }}
          >
            <input
              value={fixedAmount}
              onChange={(e) =>
                setFixedAmount(e.target.value)
              }
              placeholder="Fixed Amount"
              style={{ marginRight: 8 }}
            />
            <input
              value={fixedReferrer}
              onChange={(e) =>
                setFixedReferrer(e.target.value)
              }
              placeholder="Referrer Wallet (optional)"
              style={{ marginRight: 8 }}
            />
            <button type="submit">Buy Fixed (MLM)</button>
          </form>

          {/* Flexible Purchase (Affiliate) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFlexPurchase(flexAmount, flexAffiliate);
            }}
            style={{ marginBottom: 16 }}
          >
            <input
              value={flexAmount}
              onChange={(e) =>
                setFlexAmount(e.target.value)
              }
              placeholder="Flex Amount"
              style={{ marginRight: 8 }}
            />
            <input
              value={flexAffiliate}
              onChange={(e) =>
                setFlexAffiliate(e.target.value)
              }
              placeholder="Affiliate Wallet (optional)"
              style={{ marginRight: 8 }}
            />
            <button type="submit">
              Buy Flex (Affiliate)
            </button>
          </form>

          {/* Withdraw */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleWithdraw(withdrawAmount, withdrawPin);
            }}
            style={{ marginBottom: 16 }}
          >
            <input
              value={withdrawAmount}
              onChange={(e) =>
                setWithdrawAmount(e.target.value)
              }
              placeholder="Withdraw Amount"
              style={{ marginRight: 8 }}
            />
            <input
              value={withdrawPin}
              onChange={(e) =>
                setWithdrawPin(e.target.value)
              }
              placeholder="4-digit PIN"
              type="password"
              style={{ marginRight: 8 }}
            />
            <button type="submit">Withdraw</button>
          </form>

          {/* Result Message */}
          {result && (
            <div
              style={{ marginTop: 16, color: "#1DE9B6" }}
            >
              {result}
            </div>
          )}
        </>
      )}
    </div>
  );
}
