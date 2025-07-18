import { ThirdwebProvider } from "thirdweb/react";
import { useEffect, useState } from "react";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "71e20f4fe4537525ee7c766d094b27b1";

// Added warning system
if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID) {
  console.warn(
    "%c⚠️ Using fallback ThirdWeb Client ID",
    "color: #FFA500; font-weight: bold;",
    "\nFor production deployments, please set NEXT_PUBLIC_THIRDWEB_CLIENT_ID in your environment variables"
  );
}

// Client-side only wrapper
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
