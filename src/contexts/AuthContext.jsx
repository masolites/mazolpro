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

  // No password required
  const login = async (email, wallet) => {
    setLoading(true);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "login",
        email,
        wallet,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) throw new Error(data.error);
    setUser(data.user);
    setAdmin(false); // No admin logic for now
    localStorage.setItem(
      "mazol_user",
      JSON.stringify({ user: data.user, admin: false }),
    );
  };

  const signup = async (email, wallet) => {
    setLoading(true);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "register",
        email,
        wallet,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) throw new Error(data.error);
    setUser({ email, wallet });
    setAdmin(false);
    localStorage.setItem(
      "mazol_user",
      JSON.stringify({
        user: { email, wallet },
        admin: false,
      }),
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
