import React, { useState } from "react";
import AuthModal from "../components/AuthModal";
import PlatformIntro from "../components/PlatformIntro";
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

  return (
    <div className="container">
      <PlatformIntro />
      {showAuth && <AuthModal onAuth={handleAuth} />}
      {!showAuth && (
        <>
          <header className="header">
            <img
              src="/logo.png"
              alt="MAZOL-Pro"
              className="logo"
            />
            <h1>MAZOL-Pro</h1>
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </header>
          <main className="main">
            <h2>Welcome, {user?.email || user?.wallet}!</h2>
            <PrivateSale user={user} />
            {/* More features will be added here */}
          </main>
        </>
      )}
      <footer className="footer">
        &copy; {new Date().getFullYear()} MAZOL-Pro
      </footer>
    </div>
  );
}
