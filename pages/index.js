import { useState } from "react";
import {
  ConnectButton,
  useActiveAccount,
} from "thirdweb/react";
import BuyModal from "../components/BuyModal";

const THIRDWEB_CLIENT_ID =
  "23ca42a52fded0d2d5adb5f79c92030e";

export default function Home() {
  const [showBuy, setShowBuy] = useState(false);
  const account = useActiveAccount();

  return (
    <div style={{ padding: 32 }}>
      <h1>MAZOL MZLx Private Sale</h1>
      <ConnectButton clientId={THIRDWEB_CLIENT_ID} />
      <button
        onClick={() => setShowBuy(true)}
        style={{ marginTop: 24 }}
      >
        Buy Tokens
      </button>
      {showBuy && (
        <BuyModal onClose={() => setShowBuy(false)} />
      )}
      {account && (
        <div style={{ marginTop: 16 }}>
          Connected: {account.address.slice(0, 6)}...
          {account.address.slice(-4)}
        </div>
      )}
    </div>
  );
}
