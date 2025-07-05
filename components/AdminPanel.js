import React from "react";

export default function AdminPanel({ settings, onUpdate }) {
  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>
      <label>
        Matrix Entry Fee:
        <input
          type="number"
          value={settings.matrixEntryFee}
          onChange={(e) =>
            onUpdate({ matrixEntryFee: e.target.value })
          }
        />
      </label>
      {/* More settings... */}
    </div>
  );
}
