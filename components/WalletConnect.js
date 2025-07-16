 import { useState } from "react";

export default function BuyModal({
  mode,
  onClose,
  user,
  onPurchase,
}) {
  const [amount, setAmount] = useState(
    mode === "fixed" ? 1000 : "",
  );
  const [paymentMethod, setPaymentMethod] =
    useState("flutterwave");
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!user) {
      setMessage("Wallet not connected");
      return;
    }

    if (mode === "flex" && amount < 200) {
      setMessage("Minimum amount is ₦200");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const endpoint =
        paymentMethod === "flutterwave"
          ? "/api/deposit/flutterwave"
          : "/api/deposit/manual";

      const formData = new FormData();
      formData.append("walletAddress", user.walletAddress);
      formData.append(
        "amount",
        mode === "fixed" ? 1000 : amount,
      );
      formData.append("purchaseType", mode);

      if (paymentMethod === "manual" && proof) {
        formData.append("proof", proof);
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        if (paymentMethod === "flutterwave") {
          window.open(result.paymentLink, "_blank");
          setMessage("Payment link opened in new tab");
        } else {
          setMessage(
            "Deposit submitted for admin approval",
          );
        }
        if (onPurchase) setTimeout(onPurchase, 3000);
      } else {
        throw new Error(
          result.error || "Transaction failed",
        );
      }
    } catch (error) {
      setMessage(error.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, #4d0000, #1DE9B6)",
          padding: "20px",
          borderRadius: "15px",
          width: "90%",
          maxWidth: "400px",
          color: "#fff5e1",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          {mode === "fixed"
            ? "Fixed Purchase"
            : "Flexible Purchase"}
        </h2>

        {mode === "flex" && (
          <div style={{ marginBottom: "15px" }}>
            <label>Amount (₦):</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="200"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: "15px" }}>
          <label>Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            <option value="flutterwave">Flutterwave</option>
            <option value="manual">
              Manual Bank Deposit
            </option>
          </select>
        </div>

        {paymentMethod === "manual" && (
          <div style={{ marginBottom: "15px" }}>
            <label>Proof of Payment:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProof(e.target.files[0])}
              style={{ width: "100%" }}
            />
          </div>
        )}

        {message && (
          <p
            style={{
              color: message.includes("success")
                ? "#1DE9B6"
                : "#FF69B4",
              textAlign: "center",
              margin: "10px 0",
            }}
          >
            {message}
          </p>
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              background: "#FFA726",
              color: "#1a0000",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              fontWeight: "bold",
              flex: 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
          <button
            onClick={onClose}
            style={{
              background: "#FF69B4",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
