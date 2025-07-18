 import { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import dynamic from "next/dynamic";

// Dynamically import BuyModal to prevent SSR
const BuyModal = dynamic(() => import("../components/BuyModal"), {
  ssr: false,
});

export default function Home() {
  const [showBuy, setShowBuy] = useState(false);
  const account = useActiveAccount();

  return (
    <div style={{ padding: 32 }}>
      <h1>MAZOL MZLx Private Sale</h1>
      <ConnectButton />
      <button
        onClick={() => setShowBuy(true)}
        style={{ marginTop: 24 }}
      >
        Buy Tokens
      </button>
      {showBuy && <BuyModal onClose={() => setShowBuy(false)} />}
      {account && (
        <div style={{ marginTop: 16 }}>
          Connected: {account.address.slice(0, 6)}...
          {account.address.slice(-4)}
        </div>
      )}
    </div>
  );
}
