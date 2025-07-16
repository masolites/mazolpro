import { useState, useEffect } from 'react';

export default function AdminPanel({ onClose }) {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authenticated) {
      fetchPendingDeposits();
    }
  }, [authenticated]);

  const fetchPendingDeposits = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/deposits');
      const data = await response.json();
      setDeposits(data);
    } catch (error) {
      console.error('Failed to fetch deposits:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveDeposit = async (id) => {
    try {
      const response = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      
      if (response.ok) {
        fetchPendingDeposits();
      } else {
        const error = await response.json();
        alert(error.error || 'Approval failed');
      }
    } catch (error) {
      console.error('Approval error:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // In production, verify password with backend
    if (password === process.env.ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  if (!authenticated) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1001
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #4d0000, #9C27B0)',
          padding: '20px',
          borderRadius: '15px',
          width: '90%',
          maxWidth: '400px',
          color: '#fff5e1'
        }}>
          <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '15px' }}>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  background: '#1DE9B6',
                  color: '#1a0000',
                  padding: '10px',
                  borderRadius: '5px',
                  border: 'none',
                  fontWeight: 'bold',
                  flex: 1
                }}
              >
                Login
              </button>
              <button
                onClick={onClose}
                style={{
                  background: '#FF69B4',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '5px',
                  border: 'none',
                  fontWeight: 'bold',
                  flex: 1
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #4d0000, #1DE9B6)',
        padding: '20px',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '600px',
        color: '#fff5e1',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2>Pending Deposits</h2>
          <button onClick={onClose} style={{ background: '#FF69B4', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>
            Close
          </button>
        </div>
        
        {loading ? (
          <p>Loading deposits...</p>
        ) : deposits.length === 0 ? (
          <p>No pending deposits</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Wallet</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Type</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Proof</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit) => (
                <tr key={deposit._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <td style={{ padding: '10px' }}>{deposit.walletAddress?.slice(0, 6)}...{deposit.walletAddress?.slice(-4)}</td>
                  <td style={{ padding: '10px' }}>₦{deposit.amount}</td>
                  <td style={{ padding: '10px' }}>{deposit.purchaseType}</td>
                  <td style={{ padding: '10px' }}>
                    {deposit.proofUrl && (
                      <a href={deposit.proofUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1DE9B6' }}>
                        View
                      </a>
                    )}
                  </td>
                  <td style={{ padding: '10px' }}>
                    <button 
                      onClick={() => approveDeposit(deposit._id)}
                      style={{
                        background: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '5px 10px',
                        cursor: 'pointer'
                      }}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
