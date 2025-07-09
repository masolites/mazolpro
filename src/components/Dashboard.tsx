import React from "react";

type Props = {
  user: any;
  onLogout: () => void;
};

export default function Dashboard({
  user,
  onLogout,
}: Props) {
  return (
    <div
      className="main-container"
      style={{ maxWidth: 600, margin: "2rem auto" }}
    >
      <h2>Welcome, {user.email || user.wallet}!</h2>
      <p>
        This is your dashboard. More features coming soon.
      </p>
      <button
        onClick={onLogout}
        style={{
          marginTop: 16,
          padding: 10,
          background: "#1a237e",
          color: "#fff",
          border: "none",
          borderRadius: 6,
        }}
      >
        Logout
      </button>
    </div>
  );
}
