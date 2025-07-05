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

  return (
    <div style={{
      padding: '15px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '100%'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '20px',
        padding: '10px',
        background: '#1a1a1a',
        color: 'white',
        borderRadius: '8px'
      }}>
        <h1>MASOL E-COMMERCE</h1>
        <p>Private Sale ICO: 90 Days</p>
      </header>
      
      <ICOSection userData={userData} />
      <MiningSection userData={userData} />
      <MatrixProgress stage={userData.stage} />
    </div>
  );
  }
