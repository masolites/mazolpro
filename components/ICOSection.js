import { useState, useEffect } from 'react';

export default function ICOSection({ userData, updateUserData }) {
  const [countdown, setCountdown] = useState('90:00:00:00');
  const [amount, setAmount] = useState(1000);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    const endDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endDate - now;
      
      if (diff <= 0) {
        clearInterval(timer);
        setCountdown('ICO ENDED');
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown(`${days}d ${hours}h ${mins}m ${secs}s`);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleFixedBuy = async () => {
    if (!userData.address) {
      alert('Please connect your wallet first');
      return;
    }
    
    setIsProcessing(true);
    try {
      const res = await fetch('/api/purchase/fixed', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: userData.address })
      });
      
      if (res.ok) {
        const result = await res.json();
        alert('Purchase successful! Tokens added to your account');
        updateUserData({
          tokens: userData.tokens + 1000,
          isBuyer: true,
          stage: result.newStage
        });
      } else {
        const error = await res.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCustomBuy = async () => {
    if (!userData.address) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (amount < 200) {
      alert('Minimum purchase is ₦200');
      return;
    }
    
    setIsProcessing(true);
    try {
      const res = await fetch('/api/purchase/custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          address: userData.address,
          amount 
        })
      });
      
      if (res.ok) {
        const result = await res.json();
        alert(`Purchase successful! ${result.tokens} tokens added to your account`);
        updateUserData({
          tokens: userData.tokens + result.tokens,
          isBuyer: true
        });
      } else {
        const error = await res.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>ICO Purchase</h2>
      <p style={styles.countdown}>Time Remaining: <strong>{countdown}</strong></p>
      
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Fixed Price Package</h3>
        <p style={styles.cardText}>₦1,000 = 1,000 MAZOL Tokens</p>
        <button 
          onClick={handleFixedBuy}
          style={styles.button}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Buy Fixed Package'}
        </button>
        <p style={styles.note}>Auto-stage progression</p>
      </div>
      
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Custom Purchase</h3>
        <p style={styles.cardText}>Minimum: ₦200 (or equivalent)</p>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(Number(e.target.value))}
          min="200"
          placeholder="Enter amount in ₦"
          style={styles.input}
          disabled={isProcessing}
        />
        <button 
          onClick={handleCustomBuy}
          style={styles.button}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Buy Custom Amount'}
        </button>
        <p style={styles.note}>Flexible token purchase</p>
      </div>
      
      <div style={styles.paymentMethods}>
        <h4>Payment Methods:</h4>
        <ul style={styles.methodsList}>
          <li>Flutterwave</li>
          <li>USDT (ERC-20)</li>
          <li>Bank Transfer (Requires Approval)</li>
          <li>Platform Wallet Balance</li>
        </ul>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  heading: {
    fontSize: '22px',
    marginBottom: '15px',
    color: '#2c3e50',
    textAlign: 'center',
  },
  countdown: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '25px',
    textAlign: 'center',
    color: '#e74c3c',
    backgroundColor: '#fef9e7',
    padding: '10px',
    borderRadius: '8px',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    border: '1px solid #e1e5eb',
  },
  cardTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#2980b9',
  },
  cardText: {
    fontSize: '16px',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '14px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: '600',
    marginBottom: '10px',
  },
  input: {
    padding: '14px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '100%',
    marginBottom: '15px',
    boxSizing: 'border-box',
  },
  note: {
    fontSize: '14px',
    color: '#7f8c8d',
    textAlign: 'center',
    margin: '0',
  },
  paymentMethods: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  methodsList: {
    paddingLeft: '20px',
    margin: '10px 0 0 0',
  }
};
