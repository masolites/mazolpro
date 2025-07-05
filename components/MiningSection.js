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
    <section style={styles.section}>
      <h2 style={styles.heading}>Token Mining</h2>
      <p style={styles.speed}>Speed: {miningSpeed}x (Silver)</p>
      
      <button 
        style={{
          ...styles.button,
          backgroundColor: isMining ? '#27ae60' : '#e67e22'
        }}
        onClick={() => setIsMining(!isMining)}
      >
        {isMining ? 'MINING...' : 'START MINING'}
      </button>
      
      <div style={styles.stats}>
        <p>Session: {formatTime(time)}</p>
        <p>Total Mined: {mined} MAZOL</p>
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
    marginBottom: '5px'
  },
  speed: {
    marginBottom: '15px'
  },
  button: {
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '15px'
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-between'
  }
};
