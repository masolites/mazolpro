 import { useState } from "react";
import {
  ConnectButton,
  useActiveAccount,
} from "thirdweb/react";
import BuyModal from "../components/BuyModal";

export default function Home() {
  const [showBuy, setShowBuy] = useState(false);
  const account = useActiveAccount();

  return (
    <div style={{ padding: 32 }}>
      <h1>MAZOL MZLx Private Sale</h1>
      <ConnectButton
        clientId={
          process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID
        }
      />
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
