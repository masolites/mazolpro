 import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const MINING_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

function formatTime(ms: number) {
  if (!ms || ms <= 0) return "00:00:00";
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = String(
    Math.floor(totalSeconds / 3600),
  ).padStart(2, "0");
  const minutes = String(
    Math.floor((totalSeconds % 3600) / 60),
  ).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(
    2,
    "0",
  );
  return `${hours}:${minutes}:${seconds}`;
}

export default function Mining({
  user,
  onRequireAuth,
}: {
  user: any;
  onRequireAuth: () => void;
}) {
  const [mining, setMining] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(
    null,
  );
  const [speed, setSpeed] = useState<number | null>(null);
  const [timer, setTimer] = useState("00:00:00");
  const [result, setResult] = useState("");
  const miningTimeout = useRef<NodeJS.Timeout | null>(null);

  // Update timer every second if mining
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mining && startTime) {
      const updateTimer = () => {
        const now = Date.now();
        const diff = now - startTime.getTime();
        if (diff >= MINING_DURATION_MS) {
          setMining(false);
          setTimer("00:00:00");
          setResult(
            "Mining session ended. Please restart to mine again.",
          );
          setStartTime(null);
          setSpeed(null);
        } else {
          setTimer(formatTime(diff));
        }
      };
      updateTimer();
      interval = setInterval(updateTimer, 1000);
    } else {
      setTimer("00:00:00");
    }
    return () => clearInterval(interval);
  }, [mining, startTime]);

  // Clean up mining timeout on unmount
  useEffect(() => {
    return () => {
      if (miningTimeout.current)
        clearTimeout(miningTimeout.current);
    };
  }, []);

  const handleToggleMining = async () => {
    setResult("");
    if (!user) {
      setResult(
        "Please sign up or sign in to start mining.",
      );
      onRequireAuth();
      return;
    }
    if (!mining) {
      try {
        const res = await axios.post("/api/mining", {
          wallet: user.wallet || user.email,
        });
        if (res.data.session) {
          setMining(true);
          setStartTime(new Date(res.data.session.start));
          setSpeed(res.data.session.speed);
          setResult(res.data.message || "Mining started!");
          // Set timeout to auto-end mining after 24 hours
          if (miningTimeout.current)
            clearTimeout(miningTimeout.current);
          miningTimeout.current = setTimeout(() => {
            setMining(false);
            setTimer("00:00:00");
            setResult(
              "Mining session ended. Please restart to mine again.",
            );
            setStartTime(null);
            setSpeed(null);
          }, MINING_DURATION_MS);
        } else {
          setResult(
            res.data.error || "Could not start mining.",
          );
        }
      } catch (err: any) {
        setResult(
          err.response?.data?.error || "Error occurred",
        );
      }
    } else {
      // Optionally, allow user to stop mining early
      setMining(false);
      setTimer("00:00:00");
      setResult("Mining stopped.");
      setStartTime(null);
      setSpeed(null);
      if (miningTimeout.current)
        clearTimeout(miningTimeout.current);
    }
  };

  return (
    <section className="ico-card mining-card">
      <div className="ico-header">
        <span className="ico-title">
          Start FREE MAZOL mining
        </span>
      </div>
      <div className="digital-clock-row">
        <span className="digital-clock">{timer}</span>
        <button
          className="mining-toggle-btn big-3d-btn"
          onClick={handleToggleMining}
          style={{
            background: mining ? "#1db954" : "#ff9800",
            color: "#fffbe6",
            fontWeight: 700,
            letterSpacing: 1,
            marginLeft: "1.2rem",
            minWidth: "80px",
          }}
        >
          {mining ? "ON" : "OFF"}
        </button>
      </div>
      <div className="ico-stats">
        <div>
          <span className="ico-main">
            {speed === 3
              ? "Gold 🥇"
              : speed === 1
                ? "Silver 🥈"
                : "--"}
          </span>
          <span className="ico-label">Speed</span>
        </div>
      </div>
      {result && <div className="result">{result}</div>}
    </section>
  );
}
