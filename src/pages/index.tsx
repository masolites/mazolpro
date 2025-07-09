import React, { useState } from "react";
import { api } from "../utils/api";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth", {
        action: "login",
        email,
        wallet: email,
        password,
      });
      if (res.data.user) {
        setUser(res.data.user);
      } else {
        setError(
          res.data.message ||
            "Login successful, but no user returned.",
        );
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleLogout = () => setUser(null);

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "3rem auto",
        padding: 24,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px #eee",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#1a237e" }}>
        MAZOL-Pro
      </h1>
      <h2
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: 400,
          color: "#333",
        }}
      >
        Mazol-Pro is a Blockchain supported Platform
        promoting a Better Society Together by offering
        Trusted Systems, Goods & Services to people
      </h2>
      {!user ? (
        <form
          onSubmit={handleAuth}
          style={{ marginTop: 32 }}
        >
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                marginBottom: 12,
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                marginBottom: 12,
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
          </label>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: 10,
              background: "#1a237e",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontWeight: 600,
            }}
          >
            Sign In
          </button>
          {error && (
            <div style={{ color: "red", marginTop: 12 }}>
              {error}
            </div>
          )}
        </form>
      ) : (
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <h3>Welcome, {user.email || user.wallet}!</h3>
          <button
            onClick={handleLogout}
            style={{
              marginTop: 16,
              padding: 10,
              background: "#1a237e",
              color: "#fff",
              border: "none",
              borderRadius: 6,
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
