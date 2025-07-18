 import { ThirdwebProvider } from "thirdweb/react";
import { useState, useEffect } from "react";
import Head from "next/head";
import ErrorBoundary from "../components/ErrorBoundary";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "71e20f4fe4537525ee7c766d094b27b1";

function SafeHydrate({ children }) {
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
        height: '100vh',
        backgroundColor: '#f0f2f5'
      }}>
        <Head>
          <title>Loading MAZOL MZLx...</title>
        </Head>
        <div style={{ textAlign: 'center' }}>
          <h2>Loading MAZOL MZLx Platform...</h2>
          <p>Please wait while we initialize the application</p>
        </div>
      </div>
    );
  }

  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MAZOL MZLx Private Sale</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Purchase MAZOL MZLx tokens" />
      </Head>
      <ThirdwebProvider clientId={clientId}>
        <SafeHydrate>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </SafeHydrate>
      </ThirdwebProvider>
    </>
  );
}
