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

  const login = async (email, password) => {
    setLoading(true);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "login",
        email,
        password,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) throw new Error(data.error);
    setUser(data.user);
    const isAdmin =
      data.user?.role === "admin" ||
      email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    setAdmin(isAdmin);
    localStorage.setItem(
      "mazol_user",
      JSON.stringify({ user: data.user, admin: isAdmin }),
    );
  };

  const signup = async (email, password) => {
    setLoading(true);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "register",
        email,
        password,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) throw new Error(data.error);
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
