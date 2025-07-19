// /pages/_app.js

import { ThirdwebProvider } from "thirdweb/react";
import { metamaskWallet, inAppWallet } from "thirdweb/wallets";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      wallets={[
        metamaskWallet(),
        inAppWallet({
          // You can add config here if needed, or leave empty for defaults
        }),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
