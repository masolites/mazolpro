import { ThirdwebProvider } from "@thirdweb-dev/react";
import Head from 'next/head';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <ThirdwebProvider activeChain="binance" clientId={process.env.THIRDWEB_CLIENT_ID}>
      <Head>
        <title>MASOL E-COMMERCE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Dashboard />
    </ThirdwebProvider>
  );
}
