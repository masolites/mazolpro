import { useState } from "react";

export default function AuthOverlay({ onAuth }) {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: 60,
        left: 0,
        right: 0,
        bottom: 60,
        background: "rgba(255,255,255,0.85)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: 16,
          padding: "2rem",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          minWidth: 320,
          maxWidth: "90vw",
          textAlign: "center",
        }}
      >
        <h2>Mazol Pro</h2>
        <p>
          Sign up or sign in to start mining and unlock all
          features!
        </p>
        {/* Replace below with your actual auth logic */}
        <button
          style={{
            margin: "1rem 0",
            padding: "0.75rem 2rem",
            borderRadius: 8,
            border: "none",
            background: "#0070f3",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
          }}
          onClick={onAuth}
        >
          {showSignIn ? "Sign In" : "Sign Up"}
        </button>
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowSignIn(!showSignIn);
            }}
            style={{ color: "#0070f3", fontSize: "0.9rem" }}
          >
            {showSignIn
              ? "Need an account? Sign Up"
              : "Already have an account? Sign In"}
          </a>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <button
            style={{
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              opacity: 0.7,
              cursor: "not-allowed",
            }}
            disabled
          >
            START FREE MINING
          </button>
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            00:00:00
          </div>
        </div>
      </div>
    </div>
  );
}
