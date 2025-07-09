import { useState } from "react";
import { apiPost } from "../../utils/api";

export default function SignUpForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await apiPost("/api/auth", {
      action: "register",
      email,
      wallet,
      password,
    });
    if (res.error) setError(res.error);
    else onSuccess();
  }

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col gap-4"
    >
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="input"
        type="text"
        placeholder="Wallet Address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        required
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500">{error}</div>}
      <button className="btn-primary" type="submit">
        Sign Up
      </button>
    </form>
  );
}
