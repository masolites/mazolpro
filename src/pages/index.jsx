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
        background: "#1a0000",
      }}
    >
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          padding: "2rem 0 1rem 0",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: "2.5rem",
            letterSpacing: "0.05em",
          }}
        >
          Mazol Pro
        </h1>
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
          onRequireAuth={() => setIsAuthenticated(false)}
        />
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Mazol Pro</p>
      </footer>

      {/* Auth Overlay */}
      {!isAuthenticated && (
        <AuthOverlay onAuth={handleAuth} />
      )}
    </div>
  );
}
