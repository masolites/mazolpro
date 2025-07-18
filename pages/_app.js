import { ThirdwebProvider } from "thirdweb/react";
import { useState, useEffect } from "react";
import Head from "next/head";

// 1. Directly use the client ID without env fallback for now
const clientId = "71e20f4fe4537525ee7c766d094b27b1";

// 2. Simplified provider wrapper
export default function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <ThirdwebProvider clientId={clientId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
