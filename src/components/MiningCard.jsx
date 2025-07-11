 export default function MiningCard({
  isAuthenticated,
  onRequireAuth,
}) {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #fff5e1 80%, #e9d5ff 100%)",
        borderRadius: 18,
        boxShadow: "0 4px 16px 0 #FF69B4",
        minWidth: 260,
        maxWidth: 320,
        padding: "1.2rem",
        textAlign: "center",
        color: "#800000",
        margin: "0 auto",
      }}
      onClick={() => {
        if (!isAuthenticated) {
          onRequireAuth();
        } else {
          // Start mining logic here
        }
      }}
    >
      <h3 style={{ margin: 0, color: "#1DE9B6" }}>
        Start Free Mining
      </h3>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          margin: "1rem 0",
          color: "#FF69B4",
          textShadow: "0 2px 8px #e9d5ff",
        }}
      >
        00:00:00
      </div>
      <button
        style={{
          background: "#1DE9B6",
          color: "#800000",
          border: "none",
          borderRadius: 12,
          padding: "0.8rem 2rem",
          fontSize: "1.1rem",
          fontWeight: "bold",
          boxShadow: "0 2px 8px #d8b4fe",
          cursor: isAuthenticated
            ? "pointer"
            : "not-allowed",
          opacity: isAuthenticated ? 1 : 0.7,
        }}
        disabled={!isAuthenticated}
      >
        START FREE MINING
      </button>
    </div>
  );
}
