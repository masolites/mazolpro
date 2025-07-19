// /pages/_app.js

import { ThirdwebProvider } from "thirdweb/react";
import { embeddedWallet, inAppWallet, coinbaseWallet, rainbowWallet, trustWallet } from "thirdweb/wallets";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      wallets={[
        embeddedWallet(),
        inAppWallet(),
        coinbaseWallet(),
        rainbowWallet(),
        trustWallet(),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
