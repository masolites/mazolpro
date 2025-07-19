// /pages/index.js

import { ConnectButton } from "thirdweb/react";

export default function Home() {
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
      <h1>Welcome to Mazol</h1>
      <p>
        Create or connect your Mazol wallet to get started with buying, mining, or managing your MZLx tokens.
      </p>
      <ConnectButton />
      {/* You can add more UI here for token purchase, mining, etc. */}
    </main>
  );
}
