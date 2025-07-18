 import { ThirdwebProvider } from "thirdweb/react";

const clientId = "71e20f4fe4537525ee7c766d094b27b1";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider clientId={clientId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
