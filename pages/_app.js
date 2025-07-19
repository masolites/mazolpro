import { ThirdwebProvider } from "thirdweb/react";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      activeChain="binance"
      supportedWallets={["embeddedWallet", "metamask", "coinbase", "walletConnect"]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
