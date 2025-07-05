import React from "react";
import MatrixDisplay from "../components/MatrixDisplay";
import MiningSection from "../components/MiningSection";
import NavigationTabs from "../components/NavigationTabs";
import "../styles/globals.css";

const dummyUser = {
  email: "user@example.com",
  matrix: [
    { level: 1, count: 7, earnings: "₦1,470" },
    { level: 2, count: 49, earnings: "₦14,700" },
  ],
  mining: { baseSpeed: 1, boost: 2, totalSpeed: 3 },
};

export default function ProfilePage() {
  return (
    <div className="main-bg">
      <div className="profile">
        <h2>Welcome, {dummyUser.email}</h2>
        <MatrixDisplay userMatrix={dummyUser.matrix} />
        <MiningSection miningStats={dummyUser.mining} />
        {/* Voting history, settings, etc. */}
      </div>
      <NavigationTabs />
    </div>
  );
}
