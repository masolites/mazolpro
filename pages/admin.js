import React from "react";
import AdminPanel from "../components/AdminPanel";
import NavigationTabs from "../components/NavigationTabs";
import "../styles/globals.css";

const dummySettings = {
  matrixEntryFee: 1000,
};

export default function AdminPage() {
  const handleUpdate = (newSettings) => {
    // Update settings logic
  };

  return (
    <div className="main-bg">
      <AdminPanel
        settings={dummySettings}
        onUpdate={handleUpdate}
      />
      <NavigationTabs />
    </div>
  );
}
