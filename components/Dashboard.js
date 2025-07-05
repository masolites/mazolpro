import { useState, useEffect } from 'react';
import ICOSection from './ICOSection';
import MiningSection from './MiningSection';
import MatrixProgress from './MatrixProgress';
import WalletConnect from './WalletConnect';

export default function Dashboard() {
  const [userData, setUserData] = useState({
    tokens: 0,
    stage: 1,
    isBuyer: false,
    address: null
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
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchData();
  }, []);

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>MASOL E-COMMERCE</h1>
        <p style={styles.subtitle}>Private Sale ICO: 90 Days</p>
        <WalletConnect userData={userData} updateUserData={updateUserData} />
      </header>
      
      <ICOSection userData={userData} updateUserData={updateUserData} />
      <MiningSection userData={userData} />
      <MatrixProgress stage={userData.stage} />
      
      <footer style={styles.footer}>
        <p>© 2025 MASOL Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    padding: '15px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '600px',
    margin: '0 auto',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '1px solid #e1e5eb',
  },
  title: {
    fontSize: '28px',
    color: '#2c3e50',
    marginBottom: '5px',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '16px',
    color: '#7f8c8d',
    marginBottom: '15px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px',
    paddingTop: '15px',
    borderTop: '1px solid #e1e5eb',
    color: '#7f8c8d',
    fontSize: '14px',
  }
};
