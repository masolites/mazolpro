// components/WalletWrapper.js
import { useEffect, useState } from "react";
import { ConnectButton } from "thirdweb/react";

export function WalletWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Initializing Wallet...</h2>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return children;
}
