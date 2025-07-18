// pages/_app.js
import dynamic from "next/dynamic";

// Dynamically import ThirdwebProvider to ensure it's only rendered on the client
const ThirdwebProvider = dynamic(
  () =>
    import("thirdweb/react").then(
      (mod) => mod.ThirdwebProvider,
    ),
  { ssr: false },
);

import { WalletWrapper } from "../components/WalletWrapper";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      activeChain="binance"
    >
      <WalletWrapper>
        <Component {...pageProps} />
      </WalletWrapper>
    </ThirdwebProvider>
  );
}
