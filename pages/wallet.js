import React from "react";
import NavigationTabs from "../components/NavigationTabs";
import "../styles/globals.css";

export default function WalletPage() {
  return (
    <div className="main-bg">
      <div className="ico-section">
        <h2>Wallet</h2>
        <p>Deposit/Withdraw Naira, USD, USDT, MAZOL</p>
        {/* Deposit/withdraw forms and balances */}
      </div>
      <NavigationTabs />
    </div>
  );
}
