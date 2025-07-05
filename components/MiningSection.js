 import React from "react";

export default function MiningSection({ miningStats }) {
  return (
    <div className="mining-section">
      <h2>Mining</h2>
      <p>Base Speed: {miningStats.baseSpeed}x</p>
      <p>Engagement Boost: {miningStats.boost}x</p>
      <p>Total: {miningStats.totalSpeed}x</p>
      {/* Mining controls, engagement actions, etc. */}
    </div>
  );
}
