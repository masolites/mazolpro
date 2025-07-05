import React from "react";

export default function WeeYanFeed() {
  return (
    <div className="weeyan-feed">
      <h2>WeeYan Social Feed</h2>
      {/* Video posts, voice notes, gifting, etc. */}
      <div
        style={{
          background: "#fff",
          color: "#2d0101",
          borderRadius: "1rem",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <strong>@creator1</strong>
        <p>Check out my new video! 🎥</p>
        <button
          style={{
            background: "#b30000",
            color: "#fff",
            border: "none",
            borderRadius: "1rem",
            padding: "0.5rem 1rem",
          }}
        >
          Gift
        </button>
      </div>
      {/* More posts... */}
    </div>
  );
}
