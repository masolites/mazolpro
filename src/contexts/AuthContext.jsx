import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("mazolpro_auth");
    if (saved) {
      const { user, token } = JSON.parse(saved);
      setUser(user);
      setToken(token);
    }
  }, []);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem(
      "mazolpro_auth",
      JSON.stringify({ user, token }),
    );
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("mazolpro_auth");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
