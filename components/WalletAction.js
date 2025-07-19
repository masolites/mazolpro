import { useActiveAccount } from "thirdweb/react";
import dynamic from "next/dynamic";

const BuyModal = dynamic(() => import("./BuyModal"), { ssr: false });

export default function WalletActions({ showModal, setShowModal }) {
  const account = useActiveAccount();

  return (
    <>
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
      {showModal && <BuyModal onClose={() => setShowModal(false)} />}
    </>
  );
}
