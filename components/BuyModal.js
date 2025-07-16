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
  const [paymentDateTime, setPaymentDateTime] =
    useState("");
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

    if (paymentMethod === "manual" && !paymentDateTime) {
      setMessage(
        "Please select the date and time of payment.",
      );
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

      if (paymentMethod === "manual") {
        formData.append("paymentDateTime", paymentDateTime);
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

  // Allow clicking the overlay to close the modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
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
        zIndex: 9999,
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
          position: "relative",
        }}
      >
        {/* Top-right close (✖️) button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "transparent",
            color: "#fff5e1",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            fontWeight: "bold",
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          &times;
        </button>
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
            <div
              style={{
                background: "#fff5e1",
                color: "#4d0000",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <div>Bank Details:</div>
              <div>MASSES</div>
              <div>1026664654</div>
              <div>UBA</div>
            </div>
            <label>Date and Time of Payment:</label>
            <input
              type="datetime-local"
              value={paymentDateTime}
              onChange={(e) =>
                setPaymentDateTime(e.target.value)
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
              }}
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
            type="button"
            onClick={onClose}
            style={{
              background: "#FF69B4",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              fontWeight: "bold",
              flex: 1,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
