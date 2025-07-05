import React from "react";
import WeeYanFeed from "../components/WeeYanFeed";
import NavigationTabs from "../components/NavigationTabs";
import "../styles/globals.css";

export default function WeeYanPage() {
  return (
    <div className="main-bg">
      <WeeYanFeed />
      <NavigationTabs />
    </div>
  );
}
