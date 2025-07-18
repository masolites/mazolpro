 // pages/index.js
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  useActiveAccount,
  ConnectButton,
} from "thirdweb/react";

const BuyModal = dynamic(
  () => import("../components/BuyModal"),
  {
    ssr: false,
    loading: () => <div>Loading purchase interface...</div>,
  },
);

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const account = useActiveAccount();

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>MAZOL MZLx Token Sale</h1>
      <div style={{ margin: "2rem 0" }}>
        <ConnectButton />
      </div>
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
          }}
        >
          Buy MZLx Tokens
        </button>
      )}
      {showModal && (
        <BuyModal onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}
