 export default function AuthCard({ onAuth }) {
  return (
    <div
      style={{
        background: "#fff5e1",
        borderRadius: 18,
        boxShadow: "0 4px 16px 0 #e9d5ff",
        padding: "2rem 1.5rem",
        minWidth: 300,
        maxWidth: 350,
        textAlign: "center",
        color: "#800000",
        margin: "0 auto",
      }}
    >
      <h3 style={{ color: "#FF69B4", marginBottom: 8 }}>
        Sign Up / Sign In
      </h3>
      <p style={{ color: "#4d0000", marginBottom: 24 }}>
        Create an account or sign in to start mining and
        access all features.
      </p>
      <button
        style={{
          background: "#1DE9B6",
          color: "#4d0000",
          border: "none",
          borderRadius: 12,
          padding: "0.75rem 2rem",
          fontWeight: "bold",
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 2px 8px #e9d5ff",
        }}
        onClick={onAuth}
      >
        Sign Up / Sign In
      </button>
    </div>
  );
}
