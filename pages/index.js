import { useState, useEffect } from 'react';
import WalletConnect from '../components/WalletConnect';
import BuyModal from '../components/BuyModal';
import MiningCounter from '../components/MiningCounter';
import AdminPanel from '../components/AdminPanel';

export default function Home() {
  const [buyModal, setBuyModal] = useState(null);
  const [mining, setMining] = useState(false);
  const [user, setUser] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState(0);

  // Fetch user balance on wallet connect
  useEffect(() => {
    if (user?.walletAddress) {
      fetchBalance();
    }
  }, [user]);

  const fetchBalance = async () => {
    try {
      const res = await fetch('/api/wallet/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: user.walletAddress })
      });
      const data = await res.json();
      setBalance(data.balance);
      setTokens(data.tokens);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #3a001a 70%, #e9d5ff 100%)',
      color: '#fff5e1',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Admin Panel Toggle */}
      <button onClick={() => setShowAdmin(!showAdmin)} style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: '#9C27B0',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        border: 'none',
        zIndex: 1000
      }}>
        ADMIN
      </button>
      
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
      
      {/* Header */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '20px'
      }}>
        <WalletConnect onConnect={setUser} />
      </div>

      <h1 style={{ color: '#1DE9B6', textAlign: 'center', marginBottom: '20px' }}>
        MAZOL-PRO PRIVATE SALE
      </h1>

      {/* Wallet Balance */}
      {user && (
        <div style={{
          background: 'rgba(77, 0, 0, 0.7)',
          padding: '10px 20px',
          borderRadius: '10px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <p>Wallet: {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}</p>
          <p>Balance: ₦{balance.toFixed(2)} | Tokens: {tokens} MZLx</p>
        </div>
      )}

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        width: '100%',
        maxWidth: '600px'
      }}>
        {/* Private Sale Card */}
        <div style={{
          background: 'linear-gradient(135deg, #4d0000, #FFA726)',
          borderRadius: '15px',
          padding: '15px',
          gridColumn: '1 / span 2',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#1DE9B6' }}>Private Sale</h2>
          <p>Token Price: $0.001</p>
          <p>Ends in: 90 days</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '15px 0' }}>
            <div style={{ background: '#fff5e1', color: '#4d0000', padding: '8px', borderRadius: '8px' }}>
              Tokens Sold: 0
            </div>
            <div style={{ background: '#d8b4fe', color: '#4d0000', padding: '8px', borderRadius: '8px' }}>
              Goal: 1,000,000
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={() => setBuyModal('fixed')}
              style={{
                background: 'linear-gradient(90deg, #1DE9B6, #4d0000)',
                color: 'white',
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                fontWeight: 'bold'
              }}
            >
              Gear 2: Fixed (₦1000)
            </button>
            <button 
              onClick={() => setBuyModal('flex')}
              style={{
                background: 'linear-gradient(90deg, #FF69B4, #FFA726)',
                color: 'white',
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                fontWeight: 'bold'
              }}
            >
              Gear 1: Flexible (Min ₦200)
            </button>
          </div>
        </div>

        {/* Mining Card */}
        <MiningCounter 
          mining={mining} 
          setMining={setMining} 
          style={{ gridColumn: '1' }}
        />

        {/* Voting Card */}
        <div style={{
          background: 'linear-gradient(135deg, #4d0000, #FF69B4)',
          borderRadius: '15px',
          padding: '15px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#FFA726' }}>Price Voting</h2>
          <p>6PM - 11PM Daily</p>
          <button style={{
            background: 'linear-gradient(90deg, #FF69B4, #1DE9B6)',
            color: 'white',
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            fontWeight: 'bold',
            marginTop: '10px',
            width: '100%'
          }}>
            View Voting
          </button>
        </div>
      </div>

      {buyModal && (
        <BuyModal 
          mode={buyModal} 
          onClose={() => setBuyModal(null)}
          user={user}
          onPurchase={fetchBalance}
        />
      )}
    </div>
  );
}
