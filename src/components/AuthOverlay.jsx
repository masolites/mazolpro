 export default function AuthOverlay({ onAuth }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        pointerEvents: "auto",
      }}
    >
      {/* Glass frame */}
      <div
        style={{
          padding: "2.5%",
          borderRadius: 32,
          background: "rgba(255,255,255,0.12)",
          boxShadow: "0 0 0 6px rgba(255,245,225,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Card */}
        <div
          style={{
            width: 340, // reduced width
            maxWidth: "90vw",
            minHeight: 340,
            background: "rgba(255,245,225,0.85)",
            borderRadius: 24,
            boxShadow:
              "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
            textAlign: "center",
            padding: "2rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ color: "#b22234", marginBottom: 8 }}>
            Sign Up / Sign In
          </h2>
          <p style={{ color: "#8b1625", marginBottom: 24 }}>
            Please sign up or sign in to start mining and
            access features.
          </p>
          <button
            style={{
              margin: "1rem 0",
              padding: "0.75rem 2rem",
              borderRadius: 12,
              border: "none",
              background: "#D4FF00", // lemon green
              color: "#7a1420",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow:
                "0 2px 8px #FFA726, 0 0 0 2px #e9d5ff",
            }}
            onClick={onAuth}
          >
            Sign Up / Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
