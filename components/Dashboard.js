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
      const res = await fetch('/api/user');
      const data = await res.json();
      setUserData(data);
    };
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>MASOL E-COMMERCE</h1>
        <p style={styles.subtitle}>Private Sale ICO: 90 Days</p>
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
    maxWidth: '600px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  title: {
    fontSize: '24px',
    color: '#2c3e50'
  },
  subtitle: {
    fontSize: '16px',
    color: '#7f8c8d'
  }
};
