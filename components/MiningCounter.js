 import { useState, useEffect } from "react";

export default function MiningCounter({
  mining,
  setMining,
}) {
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let interval;
    if (mining) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
        setTotalTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mining]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(
        2,
        "0",
      )}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #4d0000, #1DE9B6)",
        borderRadius: "15px",
        padding: "15px",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#d8b4fe" }}>Mining</h2>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#FFA726",
          margin: "10px 0",
        }}
      >
        {formatTime(time)}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <small>Total: {formatTime(totalTime)}</small>
      </div>
      <button
        onClick={() => setMining(!mining)}
        style={{
          background: mining ? "#4CAF50" : "#FFA726",
          color: mining ? "white" : "#1a0000",
          padding: "10px",
          borderRadius: "10px",
          border: "none",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        {mining ? "Mining ON" : "Start Mining"}
      </button>
    </div>
  );
}
