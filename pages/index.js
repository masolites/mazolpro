import dynamic from "next/dynamic";

const ConnectButton = dynamic(
  () => import("thirdweb/react").then((mod) => mod.ConnectButton),
  { ssr: false, loading: () => <button disabled>Connecting...</button> }
);

const BuyModal = dynamic(() => import("../components/BuyModal"), { ssr: false });

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>MAZOL MZLx Private Sale</h1>
      <ConnectButton />
      
      <button 
        onClick={() => setShowBuy(true)}
        style={{ marginTop: 20 }}
      >
        Buy Tokens
      </button>
    </div>
  );
}
