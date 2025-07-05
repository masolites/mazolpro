import { ThirdwebProvider } from "thirdweb/react";
import Dashboard from "../components/Dashboard";
import Head from "next/head";

export default function Home() {
  return (
    <ThirdwebProvider
      activeChain="binance"
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      <Head>
        <title>Mazol E-commerce</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <Dashboard />
    </ThirdwebProvider>
  );
}
