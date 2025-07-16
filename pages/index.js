 import { useState, useEffect } from "react";
import { ConnectButton } from "thirdweb/react";
import WalletModal from "../components/WalletModal";
import BuyModal from "../components/BuyModal";
import MiningCounter from "../components/MiningCounter";
import AdminPanel from "../components/AdminPanel";

// ...rest of your code

export default function Home() {
  // ...your state and logic

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        background: "linear-gradient(135deg, #3a001a 70%, #e9d5ff 100%)",
        color: "#fff5e1",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Add ConnectButton at the top right */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <ConnectButton clientId="71e20f4fe4537525ee7c766d094b27b1" />
      </div>

      {/* ...rest of your UI */}
