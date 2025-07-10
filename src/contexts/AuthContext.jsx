 // ...other imports and code
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
// ...rest of the file
