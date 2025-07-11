 import { useState } from "react";
import Features from "../components/Features";
import MiningCard from "../components/MiningCard";
import AuthOverlay from "../components/AuthOverlay";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  // Simulate authentication (replace with real logic)
  const handleAuth = () => setIsAuthenticated(true);

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        background: "#f5f5f5",
      }}
    >
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          padding: "2rem 0 1rem 0",
        }}
      >
        <h1 style={{ margin: 0 }}>Mazol Pro</h1>
        <h2
          style={{
            margin: 0,
            fontWeight: 400,
            fontSize: "1.2rem",
          }}
        >
          E-commerce & Blockchain
        </h2>
      </header>

      {/* Features Section */}
      <Features />

      {/* Mining Card at Bottom */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 60,
          zIndex: 5,
        }}
      >
        <MiningCard
          isAuthenticated={isAuthenticated}
          onRequireAuth={() => setShowOverlay(true)}
        />
      </div>

      {/* Footer */}
      <footer className="footer">
        <p style={{ textAlign: "center" }}>
          © 2025 Mazol Pro
        </p>
      </footer>

      {/* Auth Overlay */}
      {!isAuthenticated && (
        <AuthOverlay onAuth={handleAuth} />
      )}
    </div>
  );
}
