import { useState } from "react";
import {
  useActiveAccount,
  ConnectButton,
} from "thirdweb/react";
import Script from "next/script";

export default function BuyModal({ onClose }) {
  const account = useActiveAccount();
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState("flutterwave");
  const [paymentDateTime, setPaymentDateTime] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Launch Flutterwave modal
  const startFlutterwavePayment = ({
    amount,
    email,
    onSuccess,
    onClose,
  }) => {
    if (!window.FlutterwaveCheckout) {
      setMessage(
        "Flutterwave SDK not loaded. Please try again.",
      );
      setLoading(false);
      return;
    }
    window.FlutterwaveCheckout({
      public_key:
        process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: "MZLX-" + Date.now(),
      amount: Number(amount),
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: { email },
      callback: function (data) {
        if (data.status === "successful") {
          onSuccess(data);
        } else {
          setMessage("Payment not successful.");
          setLoading(false);
        }
      },
      onclose: onClose,
      customizations: {
        title: "MAZOL MZLx Private Sale",
        description: "Purchase MAZOL MZLx tokens",
        logo: "https://mazolpro.com/logo.png",
      },
    });
  };

  // Handle purchase
  const handleBuy = async () => {
    setMessage("");
    if (!account) {
      setMessage("Please connect your wallet first.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) < 200) {
      setMessage("Enter a valid amount (min ₦200).");
      return;
    }
    if (paymentMethod === "flutterwave" && !email) {
      setMessage("Please enter your email.");
      return;
    }
    if (paymentMethod === "manual" && !paymentDateTime) {
      setMessage(
        "Please select the date and time of payment.",
      );
      return;
    }

    setLoading(true);

    if (paymentMethod === "flutterwave") {
      startFlutterwavePayment({
        amount,
        email,
        onSuccess: async (paymentData) => {
          // Send payment reference to backend for verification and token transfer
          const res = await fetch("/api/mazol-purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              walletAddress: account.address,
              nairaAmount: Number(amount),
              paymentReference: paymentData.transaction_id,
              paymentMethod: "flutterwave",
              email,
            }),
          });
          const data = await res.json();
          if (res.ok) {
            setMessage(
              "Tokens will be sent to your wallet after payment verification.",
            );
          } else {
            setMessage(
              data.error || "Token transfer failed.",
            );
          }
          setLoading(false);
        },
        onClose: () => {
          setLoading(false);
          setMessage("Payment cancelled.");
        },
      });
    } else if (paymentMethod === "manual") {
      // Send manual deposit info to backend for admin approval
      const res = await fetch("/api/mazol-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: account.address,
          nairaAmount: Number(amount),
          paymentDateTime,
          paymentMethod: "manual",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(
          "Deposit submitted for admin approval. Tokens will be sent after approval.",
        );
      } else {
        setMessage(data.error || "Submission failed.");
      }
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
    <>
      {/* Flutterwave Inline SDK */}
      <Script
        src="https://checkout.flutterwave.com/v3.js"
        strategy="beforeInteractive"
      />
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
            background: "#fff5e1",
            color: "#4d0000",
            borderRadius: "15px",
            padding: "30px",
            minWidth: "320px",
            maxWidth: "90vw",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "transparent",
              color: "#4d0000",
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
          <h2 style={{ textAlign: "center" }}>
            Buy MAZOL MZLx Tokens
          </h2>
          <div style={{ marginBottom: 16 }}>
            <ConnectButton
              clientId={
                process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID
              }
            />
          </div>
          <div style={{ marginBottom: 16 }}>
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
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
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
                border: "1px solid #ccc",
              }}
            >
              <option value="flutterwave">
                Flutterwave
              </option>
              <option value="manual">
                Manual Bank Deposit
              </option>
            </select>
          </div>
          {paymentMethod === "flutterwave" && (
            <div style={{ marginBottom: 16 }}>
              <label>Email (for payment receipt):</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>
          )}
          {paymentMethod === "manual" && (
            <div style={{ marginBottom: 16 }}>
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
                  border: "1px solid #ccc",
                }}
              />
            </div>
          )}
          {message && (
            <div
              style={{
                color: message.includes("success")
                  ? "#1DE9B6"
                  : "#FF69B4",
                marginTop: "15px",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}
          <button
            onClick={handleBuy}
            disabled={loading}
            style={{
              background: "#1DE9B6",
              color: "#4d0000",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px",
              width: "100%",
            }}
          >
            {loading
              ? paymentMethod === "flutterwave"
                ? "Processing Payment..."
                : "Submitting..."
              : paymentMethod === "flutterwave"
                ? "Buy with Flutterwave"
                : "Submit Manual Deposit"}
          </button>
        </div>
      </div>
    </>
  );
}
