import React, { useState, useEffect } from "react";
import AuthModal from "../components/AuthModal";
import AdminPanel from "../components/AdminPanel";
import PrivateSale from "../components/PrivateSale";
import Mining from "../components/Mining";
import Voting from "../components/Voting";
import Wallet from "../components/Wallet";
import PlatformIntro from "../components/PlatformIntro";
import styles from "../styles/globals.css";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [admin, setAdmin] = useState<boolean>(false);
  const [showAuth, setShowAuth] = useState<boolean>(true);

  useEffect(() => {
    // Optionally, check for existing session
    const stored = localStorage.getItem("mazolpro_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleAuth = (user: any, isAdmin = false) => {
    setUser(user);
    setAdmin(isAdmin);
    setShowAuth(false);
    localStorage.setItem(
      "mazolpro_user",
      JSON.stringify(user),
    );
  };

  const handleLogout = () => {
    setUser(null);
    setAdmin(false);
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
          {admin ? (
            <AdminPanel />
          ) : (
            <main className="main">
              <PrivateSale user={user} />
              <Mining user={user} />
              <Voting user={user} />
              <Wallet user={user} />
            </main>
          )}
        </>
      )}
      <footer className="footer">
        &copy; {new Date().getFullYear()} MAZOL-Pro
      </footer>
    </div>
  );
}
