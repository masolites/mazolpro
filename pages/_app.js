import { ThirdwebProvider } from "thirdweb/react";

// Debug log to check if the env variable is available at build time
console.log(
  "DEBUG: NEXT_PUBLIC_THIRDWEB_CLIENT_ID =",
  process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
);

const clientId = "23ca42a52fded0d2d5adb5f79c92030e"; // Hardcoded for reliability

export default function App({ Component, pageProps }) {
  if (!clientId) {
    // Show a clear error in the browser if the env var is missing
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
