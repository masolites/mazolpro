 export default function AuthOverlay({ onAuth }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 60,
        left: 0,
        right: 0,
        bottom: 60,
        background: "rgba(255,255,255,0.10)", // very transparent
        backdropFilter: "blur(12px) saturate(180%)", // glass effect
        WebkitBackdropFilter: "blur(12px) saturate(180%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,245,225,0.25)", // cream glass
          borderRadius: 24,
          padding: "2rem",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          minWidth: 320,
          maxWidth: "90vw",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px) saturate(180%)",
          WebkitBackdropFilter: "blur(8px) saturate(180%)",
        }}
      >
        <h2 style={{ color: "#800000" }}>Mazol Pro</h2>
        <p style={{ color: "#4d0000" }}>
          Sign up or sign in to start mining and unlock all
          features!
        </p>
        <button
          style={{
            margin: "1rem 0",
            padding: "0.75rem 2rem",
            borderRadius: 8,
            border: "none",
            background: "#800000",
            color: "#fff5e1",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
          }}
          onClick={onAuth}
        >
          Sign Up / Sign In
        </button>
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
