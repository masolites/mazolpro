import React from "react";

export default function ICOSection() {
  return (
    <div className="ico-section">
      <h2>Buy MAZOL Tokens</h2>
      <button
        style={{
          margin: "1rem 0",
          padding: "0.7rem 2rem",
          background: "#b30000",
          color: "#fff",
          border: "none",
          borderRadius: "1rem",
        }}
      >
        Buy Fixed Amount
      </button>
      <button
        style={{
          margin: "1rem 0",
          padding: "0.7rem 2rem",
          background: "#b30000",
          color: "#fff",
          border: "none",
          borderRadius: "1rem",
        }}
      >
        Buy Flexible Amount
      </button>
      {/* Add mining, escrow, etc. as needed */}
    </div>
  );
}
