import { useState, useEffect } from "react";
import { useActiveAccount, ConnectButton } from "thirdweb/react";
import Script from "next/script";

export default function BuyModal({ onClose }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const account = useActiveAccount();
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("flutterwave");
  const [paymentDateTime, setPaymentDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!mounted) return null;

  // ... rest of the component code remains the same ...
  // Just remove the clientId prop from ConnectButton
