import { ThirdwebProvider } from "thirdweb/react";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId="71e20f4fe4537525ee7c766d094b27b1"
      activeChain="binance" // This sets BSC as the default chain for wallet connections
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
