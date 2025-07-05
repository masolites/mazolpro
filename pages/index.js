import React, { useState } from "react";
import NavigationTabs from "../components/NavigationTabs";
import CentralButton from "../components/CentralButton";
import ICOSection from "../components/ICOSection";
import VotingAnnouncement from "../components/VotingAnnouncement";
import WeeYanFeed from "../components/WeeYanFeed";
import "../styles/globals.css";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="main-bg">
      <div className="split-container">
        <div className="left-panel">
          <VotingAnnouncement />
          <ICOSection />
        </div>
        <div className="right-panel">
          <WeeYanFeed />
        </div>
        <CentralButton onClick={() => setShowAuth(true)} />
      </div>
      <NavigationTabs />
      {showAuth && (
        <div className="modal-bg">
          {/* Auth modal: Sign up / Sign in */}
          <div
            style={{
              background: "#fff",
              color: "#2d0101",
              borderRadius: "1.5rem",
              padding: "2rem",
              maxWidth: "350px",
              margin: "10vh auto",
            }}
          >
            <h2>Sign Up / Sign In</h2>
            <form>
              <input
                type="email"
                placeholder="Email"
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                  padding: "0.7rem",
                }}
              />
              <input
                type="password"
                placeholder="Password"
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                  padding: "0.7rem",
                }}
              />
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.7rem",
                  background: "#b30000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "1rem",
                }}
              >
                Continue
              </button>
            </form>
            <button
              onClick={() => setShowAuth(false)}
              style={{
                marginTop: "1rem",
                background: "none",
                color: "#b30000",
                border: "none",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
