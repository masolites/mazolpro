import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const ConnectButton = dynamic(
  () => import("thirdweb/react").then((mod) => mod.ConnectButton),
  { ssr: false }
);

const BuyModal = dynamic(() => import("../components/BuyModal"), {
  ssr: false,
  loading: () => <div style={{ padding: '20px', textAlign: 'center' }}>Loading purchase options...</div>
});

export default function Home() {
  const [showBuy, setShowBuy] = useState(false);

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      <Head>
        <title>MAZOL MZLx Private Sale</title>
      </Head>

      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a' }}>MAZOL MZLx Private Sale</h1>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <ConnectButton />
      </div>

      <button
        onClick={() => setShowBuy(true)}
        style={{
          padding: '12px 24px',
          backgroundColor: '#3182ce',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          ':hover': {
            backgroundColor: '#2c5282'
          }
        }}
      >
        Buy MZLx Tokens
      </button>

      {showBuy && <BuyModal onClose={() => setShowBuy(false)} />}
    </div>
  );
}
