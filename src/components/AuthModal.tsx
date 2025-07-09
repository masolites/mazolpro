import React, { useState } from "react";
import axios from "axios";

type Props = {
  onAuth: (user: any) => void;
};

export default function AuthModal({ onAuth }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const res = await axios.post("/api/auth", {
          action: "login",
          email,
          wallet: email,
          password,
        });
        if (res.data.user) {
          onAuth(res.data.user);
        } else {
          setError(res.data.error || "Login failed");
        }
      } else {
        const res = await axios.post("/api/auth", {
          action: "register",
          email,
          wallet: email,
          password,
        });
        if (res.data.message) {
          // Auto-login after signup
          const loginRes = await axios.post("/api/auth", {
            action: "login",
            email,
            wallet: email,
            password,
          });
          onAuth(loginRes.data.user);
        } else {
          setError(res.data.error || "Signup failed");
        }
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Error occurred",
      );
    }
  };

  return (
    <div className="auth-modal-glass-oblong">
      <div className="auth-modal-small">
        <h3>{isLogin ? "Sign In" : "Sign Up"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <div className="auth-links">
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Need an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}
