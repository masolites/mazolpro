import React from "react";

export default function MatrixDisplay({ userMatrix }) {
  return (
    <div className="matrix-display">
      <h2>Your Matrix</h2>
      <ul>
        {userMatrix.map((pos, idx) => (
          <li key={idx}>
            Level {pos.level}: {pos.count} positions,
            Earnings: {pos.earnings}
          </li>
        ))}
      </ul>
    </div>
  );
}
