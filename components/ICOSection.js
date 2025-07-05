 import { useState, useEffect } from 'react';

export default function ICOSection({ userData }) {
  const [countdown, setCountdown] = useState('90:00:00:00');
  const [amount, setAmount] = useState(1000);
  
  useEffect(() => {
    const endDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
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
    const res = await fetch('/api/purchase/fixed', { method: 'POST' });
    if (res.ok) alert('Fixed purchase initiated!');
  };

  const handleCustomBuy = async () => {
    if (amount < 200) return alert('Minimum ₦200');
    const res = await fetch('/api/purchase/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
    if (res.ok) alert('Custom purchase initiated!');
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>ICO Purchase</h2>
      <p style={styles.countdown}>Time Remaining: {countdown}</p>
      
      <div style={styles.buttonContainer}>
        <button 
          onClick={handleFixedBuy}
          style={styles.button}
        >
          Fixed Price: ₦1000
        </button>
        <p style={styles.note}>Auto-stage progression</p>
      </div>
      
      <div style={styles.customContainer}>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          min="200"
          placeholder="₦200 minimum"
          style={styles.input}
        />
        <button 
          onClick={handleCustomBuy}
          style={styles.button}
        >
          Buy Custom Amount
        </button>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  heading: {
    fontSize: '20px',
    marginBottom: '10px'
  },
  countdown: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px'
  },
  buttonContainer: {
    marginBottom: '15px',
    textAlign: 'center'
  },
  customContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  note: {
    fontSize: '14px',
    color: '#7f8c8d',
    marginTop: '5px'
  }
};
