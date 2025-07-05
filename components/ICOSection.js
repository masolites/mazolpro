import { useState, useEffect } from 'react';

export default function ICOSection({ userData }) {
  const [countdown, setCountdown] = useState('90:00:00:00');
  const [amount, setAmount] = useState(200);
  
  useEffect(() => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 90);
    
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endDate - now;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      setCountdown(`${days}d ${hours}h`);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleFixedBuy = async () => {
    try {
      const res = await fetch('/api/purchase/fixed', { method: 'POST' });
      if (res.ok) alert('Fixed purchase started!');
    } catch (error) {
      alert('Purchase failed');
    }
  };

  const handleCustomBuy = async () => {
    if (amount < 200) return alert('Minimum ₦200');
    try {
      const res = await fetch('/api/purchase/custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      if (res.ok) alert('Custom purchase started!');
    } catch (error) {
      alert('Purchase failed');
    }
  };

  return (
    <section style={styles.section}>
      <h2>ICO Purchase</h2>
      <p style={styles.countdown}>Time Remaining: {countdown}</p>
      
      <div style={styles.buttonGroup}>
        <button 
          style={styles.buyButton}
          onClick={handleFixedBuy}
        >
          Fixed Price: ₦1000
        </button>
        <p>Auto-stage progression</p>
      </div>
      
      <div style={styles.customGroup}>
        <input 
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="200"
          style={styles.input}
          placeholder="₦200 minimum"
        />
        <button 
          style={styles.buyButton}
          onClick={handleCustomBuy}
        >
          Buy Custom Amount
        </button>
      </div>
    </section>
  );
}

const styles = {
  section: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px'
  },
  countdown: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '10px 0',
    color: '#e74c3c'
  },
  buttonGroup: {
    textAlign: 'center',
    margin: '15px 0'
  },
  customGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  },
  buyButton: {
    background: '#3498db',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer'
  }
};
