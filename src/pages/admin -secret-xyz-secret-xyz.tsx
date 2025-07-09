import { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { apiPost } from "../utils/api";

export default function AdminDashboard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setResult("");
    const res = await apiPost("/api/admin", {
      action: "login",
      username,
      password,
    });
    setResult(res.message || res.error || "");
  }

  return (
    <>
      <Header />
      <main className="max-w-xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">
          Admin Login
        </h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          <input
            className="input"
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn-primary" type="submit">
            Login
          </button>
        </form>
        {result && (
          <div className="mt-2 text-blue-600">{result}</div>
        )}
      </main>
      <Footer />
    </>
  );
}
