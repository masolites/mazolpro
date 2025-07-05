import { useState, useEffect } from 'react';

export default function MiningSection({ userData }) {
  const [isMining, setIsMining] = useState(false);
  const [mined, setMined] = useState(0);
  const [time, setTime] = useState(0);
  
  const miningSpeed = userData.isBuyer ? 3 : 1;

  useEffect(() => {
    let timer;
    if (isMining) {
      const startTime = Date.now();
      timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setTime(elapsed);
        
        if (elapsed % 60000 < 100) {
          setMined(prev => prev + miningSpeed);
        }
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isMining, miningSpeed]);

  const formatTime = (ms) => {
    const mins = Math.floor(ms / 60000);
    const secs = ((ms % 60000) / 1000).toFixed(2);
    return `${mins}m ${secs}s`;
  };

  return (
    <section style={{
      marginBottom: '20px',
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '8px'
    }}>
      <h2>Token Mining</h2>
      <p>Speed: {miningSpeed}x (Silver)</p>
      
      <button 
        style={{ 
          width: '100%',
          padding: '15px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '18px',
          border: 'none',
          borderRadius: '4px',
          margin: '10px 0',
          cursor: 'pointer',
          background: isMining ? 'green' : 'orange' 
        }}
        onClick={() => setIsMining(!isMining)}
      >
        {isMining ? 'MINING...' : 'START MINING'}
      </button>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <p>Session: {formatTime(time)}</p>
        <p>Total Mined: {mined} MAZOL</p>
      </div>
    </section>
  );
  }
