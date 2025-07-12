 import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthModal({ onClose }) {
  const { login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fn = isSignUp ? register : login;
    const res = await fn(email, password);
    setResult(res.message || res.error || "");
    if (res.user) onClose();
  };

  return (
    <div className="modal">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h3>{isSignUp ? "Sign Up" : "Sign In"}</h3>
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
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <p>
          {isSignUp
            ? "Already have an account?"
            : "Don't have an account?"}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
        <div className="result">{result}</div>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
}
