 import { ThirdwebProvider } from "thirdweb/react";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider clientId="71e20f4fe4537525ee7c766d094b27b1">
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
