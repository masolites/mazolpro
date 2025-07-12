 import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("mazol_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email, password) => {
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
    if (data.user) {
      setUser(data.user);
      localStorage.setItem(
        "mazol_user",
        JSON.stringify(data.user),
      );
    }
    return data;
  };

  const register = async (email, password) => {
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
    if (data.user) {
      setUser(data.user);
      localStorage.setItem(
        "mazol_user",
        JSON.stringify(data.user),
      );
    }
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mazol_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
