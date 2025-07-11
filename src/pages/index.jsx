 import { useState } from "react";
import Features from "../components/Features";
import MiningCard from "../components/MiningCard";
import AuthCard from "../components/AuthCard";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  // Simulate authentication (replace with real logic)
  const handleAuth = () => setIsAuthenticated(true);

  return (
    <div
      style={{ minHeight: "100vh", background: "#e6d3b3" }}
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
            color: "#800000",
          }}
        >
          Mazol Pro
        </h1>
        <h2
          style={{
            margin: 0,
            fontWeight: 400,
            fontSize: "1.2rem",
            color: "#e75480",
          }}
        >
          E-commerce & Blockchain
        </h2>
      </header>

      {/* Description */}
      <section
        style={{
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
          color: "#4d0000",
          marginBottom: "1.5rem",
        }}
      >
        <p>
          Welcome to Mazol Pro, your gateway to seamless
          e-commerce and blockchain-powered rewards. Sign up
          to unlock mining, private sales, and more. Enjoy a
          secure, mobile-optimized experience with fast
          transactions and exclusive features.
        </p>
      </section>

      {/* Features */}
      <Features />

      {/* Auth Card */}
      {!isAuthenticated && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          <AuthCard onAuth={handleAuth} />
        </div>
      )}

      {/* Mining Card */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem 0",
        }}
      >
        <MiningCard
          isAuthenticated={isAuthenticated}
          onRequireAuth={() => {
            if (!isAuthenticated)
              alert("Please sign up or sign in first!");
          }}
        />
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Mazol Pro</p>
      </footer>
    </div>
  );
}
