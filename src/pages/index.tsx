 import React, { useState, useEffect } from "react";

// Try to import components, but fallback to a message if missing
let AuthModal: any = () => (
  <div>AuthModal component missing</div>
);
let PlatformIntro: any = () => (
  <div>PlatformIntro component missing</div>
);
let Mining: any = () => <div>Mining component missing</div>;
let PrivateSale: any = () => (
  <div>PrivateSale component missing</div>
);

try {
  AuthModal = require("../components/AuthModal").default;
} catch {}
try {
  PlatformIntro =
    require("../components/PlatformIntro").default;
} catch {}
try {
  Mining = require("../components/Mining").default;
} catch {}
try {
  PrivateSale =
    require("../components/PrivateSale").default;
} catch {}

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(true);

  useEffect(() => {
    // Try to load user from localStorage (if available)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mazolpro_user");
      if (saved) {
        setUser(JSON.parse(saved));
        setShowAuth(false);
      }
    }
  }, []);

  const handleAuth = (user: any) => {
    setUser(user);
    setShowAuth(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "mazolpro_user",
        JSON.stringify(user),
      );
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowAuth(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem("mazolpro_user");
    }
  };

  const requireAuth = () => setShowAuth(true);

  return (
    <div
      className="landing-flex"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PlatformIntro />
      {showAuth && <AuthModal onAuth={handleAuth} />}
      <div className="main" style={{ flex: 1 }}>
        <PrivateSale user={user} />
        <Mining user={user} onRequireAuth={requireAuth} />
      </div>
      {!showAuth && (
        <header
          className="header"
          style={{ textAlign: "center", margin: "1rem 0" }}
        >
          <img
            src="/logo.png"
            alt="MAZOL-Pro"
            className="logo"
            style={{ maxWidth: 120, marginBottom: 10 }}
          />
          <div>
            <button
              className="logout-btn"
              onClick={handleLogout}
              style={{
                background: "#222",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1.5rem",
                borderRadius: 6,
                cursor: "pointer",
                marginTop: 10,
              }}
            >
              Logout
            </button>
          </div>
        </header>
      )}
      <footer
        className="footer"
        style={{
          textAlign: "center",
          padding: "1rem 0",
          background: "#f8f8f8",
        }}
      >
        &copy; {new Date().getFullYear()} MAZOL-Pro
        <div style={{ marginTop: 8, color: "#888" }}>
          Powered by Next.js &amp; thirdweb
        </div>
      </footer>
      {/* Fallback welcome message for debugging */}
      <div
        style={{
          textAlign: "center",
          marginTop: 30,
          color: "#888",
        }}
      >
        <strong>Welcome to MazolPro!</strong>
        <div>
          If you see this, your homepage is loading
          correctly.
        </div>
      </div>
    </div>
  );
}
