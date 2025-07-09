import React, { useState } from "react";
import AuthModal from "../components/AuthModal";
import PlatformIntro from "../components/PlatformIntro";
import Mining from "../components/Mining";
import PrivateSale from "../components/PrivateSale";

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

  const requireAuth = () => setShowAuth(true);

  return (
    <div className="landing-flex">
      <PlatformIntro />
      {showAuth && <AuthModal onAuth={handleAuth} />}
      <div className="main">
        <PrivateSale user={user} />
        <Mining user={user} onRequireAuth={requireAuth} />
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
    </div>
  );
}
