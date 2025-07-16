import { useState } from "react";

export default function AdminSecrets() {
  const [pin, setPin] = useState("");
  const [school, setSchool] = useState("");
  const [authed, setAuthed] = useState(false);
  const [secrets, setSecrets] = useState({});
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchSecrets = async (pin, school) => {
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/admin/secrets", {
        headers: {
          "x-admin-pin": pin,
          "x-admin-school": school,
        },
      });
      if (!res.ok)
        throw new Error(
          "Unauthorized or error fetching secrets",
        );
      const data = await res.json();
      setSecrets(data);
      setAuthed(true);
    } catch (e) {
      setError("Access denied or error fetching secrets.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchSecrets(pin, school);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/admin/secrets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin,
          "x-admin-school": school,
        },
        body: JSON.stringify({ key, value }),
      });
      if (!res.ok) throw new Error("Failed to save secret");
      setMessage("Secret saved!");
      setSecrets({ ...secrets, [key]: value });
      setKey("");
      setValue("");
    } catch (e) {
      setError("Failed to save secret.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1a1a1a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {!authed ? (
        <form
          onSubmit={handleLogin}
          style={{
            background: "#222",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 0 10px #000",
            minWidth: "320px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            Admin Access
          </h2>
          <div style={{ marginBottom: "15px" }}>
            <label>4-digit PIN:</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>What is the name of your school?</label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              background: "#1DE9B6",
              color: "#1a0000",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Access Admin
          </button>
          {error && (
            <div
              style={{
                color: "#FF69B4",
                marginTop: "10px",
              }}
            >
              {error}
            </div>
          )}
        </form>
      ) : (
        <div
          style={{
            background: "#222",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 0 10px #000",
            minWidth: "320px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            Secrets Manager
          </h2>
          <form
            onSubmit={handleSave}
            style={{ marginBottom: "20px" }}
          >
            <input
              type="text"
              placeholder="Key (e.g. FLW_SECRET_KEY)"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                marginBottom: "10px",
              }}
              required
            />
            <input
              type="text"
              placeholder="Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                marginBottom: "10px",
              }}
              required
            />
            <button
              type="submit"
              style={{
                background: "#FFA726",
                color: "#1a0000",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Save Secret
            </button>
          </form>
          {message && (
            <div
              style={{
                color: "#1DE9B6",
                marginBottom: "10px",
              }}
            >
              {message}
            </div>
          )}
          <h3>Current Secrets</h3>
          <ul>
            {Object.entries(secrets).map(([k, v]) => (
              <li key={k}>
                <b>{k}:</b> {v}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
