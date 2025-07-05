import { ThirdwebProvider } from "@thirdweb-dev/react";
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <ThirdwebProvider activeChain="binance" clientId={process.env.THIRDWEB_CLIENT_ID}>
      <Dashboard />
    </ThirdwebProvider>
  );
}
