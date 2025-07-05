 import { useState, useEffect } from 'react';

export default function ICOSection() {
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
    alert('Fixed purchase started!');
  };

  const handleCustomBuy = async () => {
    if (amount < 200) return alert('Minimum ₦200');
    alert(`Custom purchase of ₦${amount} started!`);
  };

  return (
    <section style={{
      marginBottom: '20px',
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '8px'
    }}>
      <h2>ICO Purchase</h2>
      <p style={{
        fontSize: '1.2em',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '10px 0',
        color: '#e74c3c'
      }}>
        Time Remaining: {countdown}
      </p>
      
      <div style={{ textAlign: 'center', margin: '15px 0' }}>
        <button 
          style={{
            background: '#3498db',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%'
          }}
          onClick={handleFixedBuy}
        >
          Fixed Price: ₦1000
        </button>
        <p>Auto-stage progression</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="200"
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
          placeholder="₦200 minimum"
        />
        <button 
          style={{
            background: '#3498db',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={handleCustomBuy}
        >
          Buy Custom Amount
        </button>
      </div>
    </section>
  );
                  }
