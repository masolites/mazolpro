import { ConnectButton } from "thirdweb/react";

export default function WalletConnect({ onConnect }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <ConnectButton
        connectModal={{
          title: "Connect your wallet to Mazol Pro",
        }}
        onConnect={onConnect}
      />
    </div>
  );
}
