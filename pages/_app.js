import { ThirdwebProvider } from "thirdweb/react";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

export default function App({ Component, pageProps }) {
  if (!clientId) {
    return (
      <div style={{ padding: 32, color: "red" }}>
        <h1>Configuration Error</h1>
        <p>
          <b>NEXT_PUBLIC_THIRDWEB_CLIENT_ID</b> is not set.<br />
          Please set this environment variable in your Netlify dashboard and redeploy.
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
