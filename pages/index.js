import { ThirdwebProvider } from "@thirdweb-dev/react";
import Dashboard from '../components/Dashboard';
import Head from 'next/head';

export default function Home() {
  return (
    <ThirdwebProvider 
      activeChain="binance" 
      clientId={process.env.THIRDWEB_CLIENT_ID}
    >
      <Head>
        <title>MASOL E-COMMERCE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Dashboard />
    </ThirdwebProvider>
  );
}
