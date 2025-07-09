import React, { useState } from "react";
import AuthModal from "../components/AuthModal";
import PlatformIntro from "../components/PlatformIntro";
import Mining from "../components/Mining";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(true);

  const handleAuth = (user: any) => {
    setUser(user);
    setShowAuth(false);
    localStorage.setItem(
      "mazolpro_user",
      JSON.stringify(user),
    );
  };

  const handleLogout = () => {
    setUser(null);
    setShowAuth(true);
    localStorage.removeItem("mazolpro_user");
  };

  // This function is passed to Mining to trigger auth modal if needed
  const requireAuth = () => setShowAuth(true);

  return (
    <div className="container">
      <PlatformIntro />
      <div className="main">
        <Mining user={user} onRequireAuth={requireAuth} />
        {/* Add more features here as you build them */}
      </div>
      {!showAuth && (
        <header className="header">
          <img
            src="/logo.png"
            alt="MAZOL-Pro"
            className="logo"
          />
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>
      )}
      <footer className="footer">
        &copy; {new Date().getFullYear()} MAZOL-Pro
      </footer>
      {showAuth && <AuthModal onAuth={handleAuth} />}
    </div>
  );
}
