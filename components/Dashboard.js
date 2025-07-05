import { useState, useEffect } from 'react';
import ICOSection from './ICOSection';
import MiningSection from './MiningSection';
import MatrixProgress from './MatrixProgress';

export default function Dashboard() {
  const [userData, setUserData] = useState({
    tokens: 0,
    stage: 1,
    isBuyer: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/user');
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
      } catch (error) {
        console.log('User data loaded');
      }
    };
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>MASOL E-COMMERCE</h1>
        <p>Private Sale ICO: 90 Days</p>
      </header>
      
      <ICOSection userData={userData} />
      <MiningSection userData={userData} />
      <MatrixProgress stage={userData.stage} />
    </div>
  );
}

const styles = {
  container: {
    padding: '15px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '100%'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    padding: '10px',
    background: '#1a1a1a',
    color: 'white',
    borderRadius: '8px'
  }
}
