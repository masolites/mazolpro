 import { useState, useEffect } from "react";

export default function MiningSection({ userData }) {
  const [isMining, setIsMining] = useState(false);
  const [mined, setMined] = useState(0);
  const [time, setTime] = useState(0);
  const [sessionStarted, setSessionStarted] =
    useState(null);
  const [miningRate, setMiningRate] = useState(1);

  useEffect(() => {
    setMiningRate(userData.isBuyer ? 3 : 1);
  }, [userData.isBuyer]);

  useEffect(() => {
    let timer;
    if (isMining) {
      const startTime = Date.now() - time;
      timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setTime(elapsed);
        const tokensPerMinute = miningRate / 60;
        const newMined = tokensPerMinute * elapsed;
        setMined(Math.floor(newMined));
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isMining, miningRate, time]);

  const formatTime = (ms) => {
    const mins = Math.floor(ms / 60000);
    const secs = ((ms % 60000) / 1000).toFixed(1);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(4, "0")}`;
  };

  const startMining = () => {
    if (!isMining) {
      setSessionStarted(new Date());
      setIsMining(true);
    } else {
      setIsMining(false);
    }
  };

  const saveMiningSession = async () => {
    if (mined > 0) {
      try {
        await fetch("/api/mining/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: userData.address,
            tokens: mined,
            duration: time,
          }),
        });
        setMined(0);
        setTime(0);
      } catch (error) {
        console.error(
          "Failed to save mining session:",
          error,
        );
      }
    }
  };

  useEffect(() => {
    if (!isMining && mined > 0) {
      saveMiningSession();
    }
  }, [isMining, mined]);

  useEffect(() => {
    if (isMining && time >= 24 * 60 * 60 * 1000) {
      setIsMining(false);
    }
  }, [time, isMining]);

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Token Mining</h2>
      <div style={styles.miningInfo}>
        <div style={styles.infoCard}>
          <h4 style={styles.infoTitle}>Mining Speed</h4>
          <p style={styles.infoValue}>{miningRate}x</p>
          <p style={styles.infoLabel}>
            {userData.isBuyer
              ? "Premium (Buyer)"
              : "Silver"}
          </p>
        </div>
        <div style={styles.infoCard}>
          <h4 style={styles.infoTitle}>Total Mined</h4>
          <p style={styles.infoValue}>
            {userData.tokens.toLocaleString()}
          </p>
          <p style={styles.infoLabel}>MAZOL Tokens</p>
        </div>
      </div>
      <div style={styles.miningControls}>
        <button
          style={{
            ...styles.miningButton,
            backgroundColor: isMining
              ? "#27ae60"
              : "#e67e22",
          }}
          onClick={startMining}
          disabled={!userData.address}
        >
          {isMining ? "⛏️ MINING..." : "START MINING"}
        </button>
        <div style={styles.miningStats}>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>
              Current Session:
            </span>
            <span style={styles.statValue}>
              {formatTime(time)}
            </span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>
              Session Tokens:
            </span>
            <span style={styles.statValue}>{mined}</span>
          </div>
        </div>
      </div>
      {!userData.address && (
        <p style={styles.warning}>
          Connect your wallet to start mining
        </p>
      )}
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  heading: {
    fontSize: "22px",
    marginBottom: "15px",
    color: "#2c3e50",
    textAlign: "center",
  },
  miningInfo: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    gap: "15px",
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    border: "1px solid #e1e5eb",
  },
  infoTitle: {
    fontSize: "14px",
    margin: "0 0 5px 0",
    color: "#7f8c8d",
  },
  infoValue: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0",
    color: "#2c3e50",
  },
  infoLabel: {
    fontSize: "12px",
    margin: "5px 0 0 0",
    color: "#7f8c8d",
  },
  miningControls: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e1e5eb",
  },
  miningButton: {
    color: "white",
    padding: "16px",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "700",
    marginBottom: "20px",
  },
  miningStats: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  statItem: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid #e1e5eb",
  },
  statLabel: {
    fontSize: "12px",
    display: "block",
    color: "#7f8c8d",
    marginBottom: "5px",
  },
  statValue: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  warning: {
    backgroundColor: "#fef9e7",
    color: "#d35400",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
  },
};
