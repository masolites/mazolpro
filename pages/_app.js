// pages/_app.js
import { ThirdwebProvider } from "thirdweb/react";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  // This will show up in the build log if the env var is missing
  console.warn(
    "WARNING: NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set! The app will not work properly.",
  );
}

export default function App({ Component, pageProps }) {
  // Only render the provider if clientId is present
  if (!clientId) {
    // Show a simple error message if the env var is missing
    return (
      <div style={{ padding: 32, color: "red" }}>
        <h1>Configuration Error</h1>
        <p>
          <b>NEXT_PUBLIC_THIRDWEB_CLIENT_ID</b> is not set.
          <br />
          Please set this environment variable in your
          Netlify dashboard and redeploy.
        </p>
      </div>
    );
  }

  return (
    <ThirdwebProvider clientId={clientId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
