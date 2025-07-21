import { ThirdwebProvider } from "thirdweb/react";
import { client } from "./client";
import WalletButton from "./WalletButton";

export default function App() {
  return (
    <ThirdwebProvider>
      <div className="app">
        <h1>MazolPro Wallet Integration</h1>
        <WalletButton />
      </div>
    </ThirdwebProvider>
  );
}
