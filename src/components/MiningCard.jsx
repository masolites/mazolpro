 export default function MiningCard({
  isAuthenticated,
  onRequireAuth,
}) {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #fff5e1 80%, #e9d5ff 100%)",
        borderRadius: 24,
        boxShadow:
          "0 8px 24px 0 #b22234, 0 2px 8px #FFA726",
        margin: "0 auto",
        maxWidth: 300, // reduced size
        padding: "1.2rem",
        textAlign: "center",
        color: "#b22234",
        transform: "perspective(600px) rotateX(6deg)",
        transition: "box-shadow 0.2s",
        cursor: isAuthenticated ? "pointer" : "not-allowed",
        opacity: isAuthenticated ? 1 : 0.85,
        position: "relative",
      }}
      onClick={() => {
        if (!isAuthenticated) {
          onRequireAuth();
        } else {
          // Start mining logic here
        }
      }}
    >
      <h3 style={{ margin: 0, color: "#FF69B4" }}>
        Start Free Mining
      </h3>
      <div
        style={{
          fontSize: "2.2rem",
          fontWeight: "bold",
          margin: "1rem 0",
          color: "#1DE9B6",
          textShadow:
            "0 2px 8px #FFA726, 0 0 8px #D4FF00, 0 0 2px #e9d5ff",
        }}
      >
        00:00:00
      </div>
      <button
        style={{
          background: "#D4FF00",
          color: "#b22234",
          border: "none",
          borderRadius: 12,
          padding: "0.8rem 2rem",
          fontSize: "1.1rem",
          fontWeight: "bold",
          boxShadow: "0 2px 8px #FFA726",
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
