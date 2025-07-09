 import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  return (
    <div>
      <header
        style={{
          textAlign: "center",
          padding: "2rem 0 1rem 0",
          background: "#fff",
          borderBottom: "1px solid #eee",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#1a237e",
          }}
        >
          MAZOL-Pro
        </h1>
        <h2
          style={{
            margin: "0.5rem 0 0 0",
            fontSize: "1.2rem",
            fontWeight: 400,
            color: "#333",
          }}
        >
          Mazol-Pro is a Blockchain supported Platform
          promoting a Better Society Together by offering
          Trusted Systems, Goods & Services to people
        </h2>
      </header>
      <main>
        {!user ? (
          <AuthForm onAuth={setUser} />
        ) : (
          <Dashboard
            user={user}
            onLogout={() => setUser(null)}
          />
        )}
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: "2rem 0 1rem 0",
          color: "#888",
          fontSize: "0.95rem",
        }}
      >
        &copy; {new Date().getFullYear()} MAZOL-Pro
      </footer>
    </div>
  );
}
