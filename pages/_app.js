 import { ThirdwebProvider } from "thirdweb/react";
import { useEffect, useState } from "react";

// Use public environment variable or fallback to hardcoded value
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "71e20f4fe4537525ee7c766d094b27b1";

// Create a wrapper component that only renders on client side
function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? children : null;
}

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider clientId={clientId}>
      <ClientOnly>
        <Component {...pageProps} />
      </ClientOnly>
    </ThirdwebProvider>
  );
}
