import { useState } from "react";
import { apiPost } from "../../utils/api";

export default function SignInForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await apiPost("/api/auth", {
      action: "login",
      email,
      password,
    });
    if (res.error) setError(res.error);
    else onSuccess();
  }

  return (
    <form
      onSubmit={handleSignIn}
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
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500">{error}</div>}
      <button className="btn-primary" type="submit">
        Sign In
      </button>
    </form>
  );
}
