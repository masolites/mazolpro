 // src/contexts/AuthContext.js

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useAddress } from "thirdweb/react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const wallet = useAddress();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user info from backend when wallet connects
  useEffect(() => {
    if (!wallet) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      });
  }, [wallet]);

  // Set PIN and optional email
  const setPinAndEmail = async (pin, email) => {
    if (!wallet) return;
    setLoading(true);
    const res = await fetch("/api/user_update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet, pin, email }),
    });
    const data = await res.json();
    if (data.user) setUser(data.user);
    setLoading(false);
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        wallet,
        loading,
        setPinAndEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
