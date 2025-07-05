import { useState, useEffect } from 'react';
import { useAddress, useMetamask } from '@thirdweb-dev/react';

export default function WalletConnect({ userData, updateUserData }) {
  const address = useAddress();
  const connectWallet = useMetamask();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (address) {
      setIsConnected(true);
      updateUserData({ address });
      // Save wallet address to user profile in database
      fetch('/api/user/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address })
      });
    } else {
      setIsConnected(false);
    }
  }, [address, updateUserData]);

  return (
    <div style={styles.container}>
      {isConnected ? (
        <div style={styles.connected}>
          <p style={styles.address}>
            {address.substring(0, 6)}...{address.substring(address.length - 4)}
          </p>
          <p style={styles.status}>Connected ✅</p>
        </div>
      ) : (
        <button 
          onClick={connectWallet}
          style={styles.button}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#8e44ad',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '600',
    width: '100%',
    boxShadow: '0 4px 6px rgba(142, 68, 173, 0.2)',
  },
  connected: {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '30px',
    textAlign: 'center',
  },
  address: {
    fontSize: '14px',
    margin: '0 0 5px 0',
  },
  status: {
    fontSize: '12px',
    margin: 0,
  }
};
