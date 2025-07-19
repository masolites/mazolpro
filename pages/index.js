 import { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import BuyModal from "../components/BuyModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const account = useActiveAccount();

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 32 }}>
      <h1>MAZOL MZLx Token Private Sale</h1>
      <ConnectButton
        wallets={["embeddedWallet", "metamask", "coinbase", "walletConnect"]}
        style={{ margin: "2rem 0" }}
      />
      {account && (
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "12px 24px",
            background: "#3182ce",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: 24,
          }}
        >
          Buy MZLx Tokens
        </button>
      )}
      {showModal && <BuyModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
