import React, { useState } from "react";
import { api } from "../utils/api";

type Props = {
  onAuth: (user: any) => void;
};

export default function AuthForm({ onAuth }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("");
    try {
      const action = isLogin ? "login" : "register";
      const res = await api.post("/auth", {
        action,
        email,
        wallet: email,
        password,
      });
      if (res.data.user) {
        onAuth(res.data.user);
      } else {
        setResult(res.data.message || "Success");
      }
    } catch (err: any) {
      setResult(
        err.response?.data?.error || "Error occurred",
      );
    }
  };

  return (
    <div
      className="main-container"
      style={{ maxWidth: 400, margin: "2rem auto" }}
    >
      <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <div className="result">{result}</div>
      <div style={{ marginTop: 12 }}>
        {isLogin ? (
          <span>
            New here?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              style={{
                background: "none",
                color: "#1a237e",
                border: "none",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              style={{
                background: "none",
                color: "#1a237e",
                border: "none",
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
