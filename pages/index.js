import dynamic from "next/dynamic";
import { useState } from "react";

const ConnectButton = dynamic(
  () => import("thirdweb/react").then((mod) => mod.ConnectButton),
  { ssr: false }
);

const BuyModal = dynamic(
  () => import("../components/BuyModal"),
  { ssr: false }
);

const useActiveAccount = dynamic(
  () => import("thirdweb/react").then((mod) => mod.useActiveAccount),
  { ssr: false }
);

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  // You must use a workaround for hooks with dynamic import, so move all wallet logic into a child component that is also dynamically imported.

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1>MAZOL MZLx Token Sale</h1>
      <div style={{ margin: "2rem 0" }}>
        <ConnectButton />
      </div>
      <DynamicWalletActions showModal={showModal} setShowModal={setShowModal} />
    </main>
  );
}

const DynamicWalletActions = dynamic(() => import("../components/WalletActions"), { ssr: false });
