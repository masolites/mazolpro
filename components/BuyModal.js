import { useActiveAccount } from "thirdweb/react";
import { useState, useEffect } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";

const ConnectButton = dynamic(
  () => import("thirdweb/react").then((mod) => mod.ConnectButton),
  { ssr: false }
);

export default function BuyModal({ onClose }) {
  const [mounted, setMounted] = useState(false);
  const account = useActiveAccount();
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("flutterwave");
  const [paymentDateTime, setPaymentDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleBuy = async () => {
    if (!mounted) return;
    
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
      setMessage("Please select payment date/time.");
      return;
    }

    setLoading(true);
    
    try {
      // Payment handling logic here
    } catch (error) {
      console.error("Payment error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <Script src="https://checkout.flutterwave.com/v3.js" strategy="beforeInteractive" />
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }} onClick={onClose}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          width: '100%',
          maxWidth: '500px',
          position: 'relative'
        }} onClick={(e) => e.stopPropagation()}>
          {/* Modal content remains the same as before */}
        </div>
      </div>
    </>
  );
}
