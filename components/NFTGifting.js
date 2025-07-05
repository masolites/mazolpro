import { useState } from "react";

export default function NFTGifting() {
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState("");

  const handleGift = async () => {
    setStatus("Sending...");
    const res = await fetch("/api/nft/gift", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient }),
    });
    const data = await res.json();
    setStatus(
      data.success ? "Gift sent!" : "Error: " + data.error,
    );
  };

  return (
    <div style={styles.container}>
      <h4>Gift a Mazolet NFT</h4>
      <input
        type="text"
        placeholder="Recipient username or wallet"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleGift} style={styles.button}>
        Send Gift
      </button>
      <div>{status}</div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
    padding: 10,
    background: "#f8f9fa",
    borderRadius: 10,
    textAlign: "center",
  },
  input: {
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
    marginRight: 8,
    width: "70%",
  },
  button: {
    padding: 8,
    borderRadius: 6,
    background: "#8e44ad",
    color: "#fff",
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
  },
};
