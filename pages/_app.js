// pages/_app.js
import { ThirdwebProvider } from "thirdweb/react";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      // You can add supportedChains or other config here if needed
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
