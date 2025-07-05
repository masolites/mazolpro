import NFTGifting from "./NFTGifting";

export default function SocialFeed({
  minimized,
  onExpand,
  onMinimize,
}) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {minimized ? (
        <button style={styles.expandBtn} onClick={onExpand}>
          Expand WeeYan Socials
        </button>
      ) : (
        <button
          style={styles.minimizeBtn}
          onClick={onMinimize}
        >
          Minimize
        </button>
      )}
      <div style={styles.feed}>
        <h2>WeeYan Socials</h2>
        <p>
          Watch, like, comment, share, send gifts, voice
          notes...
        </p>
        <NFTGifting />
      </div>
    </div>
  );
}

const styles = {
  expandBtn: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    background: "#8e44ad",
    color: "#fff",
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
  },
  minimizeBtn: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    background: "#e67e22",
    color: "#fff",
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
  },
  feed: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
