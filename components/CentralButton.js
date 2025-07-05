export default function CenterButton({
  onClick,
  expanded,
  onExpand,
  onMinimize,
}) {
  return (
    <div style={styles.centerContainer}>
      {!expanded ? (
        <>
          <button style={styles.button} onClick={onClick}>
            E-commerce
          </button>
          <button
            style={styles.expandBtn}
            onClick={onExpand}
          >
            ⬆ Expand Social
          </button>
        </>
      ) : (
        <button
          style={styles.minimize}
          onClick={onMinimize}
        >
          ⬇ Minimize
        </button>
      )}
    </div>
  );
}

const styles = {
  centerContainer: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #8e44ad, #3498db)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    border: "none",
    boxShadow: "0 4px 16px rgba(52,152,219,0.15)",
    cursor: "pointer",
    marginBottom: 8,
  },
  expandBtn: {
    width: 60,
    height: 40,
    borderRadius: 20,
    background: "#8e44ad",
    color: "#fff",
    fontWeight: 600,
    fontSize: 14,
    border: "none",
    cursor: "pointer",
  },
  minimize: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "#fff",
    color: "#8e44ad",
    fontWeight: 700,
    fontSize: 18,
    border: "2px solid #8e44ad",
    boxShadow: "0 2px 8px rgba(52,152,219,0.10)",
    cursor: "pointer",
  },
};
