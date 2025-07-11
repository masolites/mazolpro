 import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("mazol_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      setAdmin(parsed.admin);
    }
    setLoading(false);
  }, []);

  // Only email is required for login/signup
  const login = async (email) => {
    setLoading(true);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", email }),
    });
    const text = await res.text(); // Read as text, not JSON
    setLoading(false);
    if (text.toLowerCase().includes("error"))
      throw new Error(text);
    setUser({ email });
    setAdmin(false);
    localStorage.setItem(
      "mazol_user",
      JSON.stringify({ user: { email }, admin: false }),
    );
  };

  const signup = async (email) => {
    setLoading(true);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "register", email }),
    });
    const text = await res.text(); // Read as text, not JSON
    setLoading(false);
    if (text.toLowerCase().includes("error"))
      throw new Error(text);
    setUser({ email });
    setAdmin(false);
    localStorage.setItem(
      "mazol_user",
      JSON.stringify({ user: { email }, admin: false }),
    );
  };

  const logout = () => {
    setUser(null);
    setAdmin(false);
    localStorage.removeItem("mazol_user");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
