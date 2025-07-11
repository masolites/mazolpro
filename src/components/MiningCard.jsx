 export default function MiningCard({
  isAuthenticated,
  onRequireAuth,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        margin: "0 auto",
        maxWidth: 400,
        padding: "1.5rem",
        textAlign: "center",
      }}
    >
      <h3>Start Free Mining</h3>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          margin: "1rem 0",
        }}
      >
        00:00:00
      </div>
      <button
        style={{
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          cursor: isAuthenticated
            ? "pointer"
            : "not-allowed",
          opacity: isAuthenticated ? 1 : 0.5,
        }}
        onClick={() => {
          if (!isAuthenticated) {
            onRequireAuth();
          } else {
            // Start mining logic here
          }
        }}
        disabled={!isAuthenticated}
      >
        START FREE MINING
      </button>
    </div>
  );
}
