import React from "react";

export default function CentralButton({ onClick }) {
  return (
    <button className="central-btn" onClick={onClick}>
      Sign Up / Sign In
    </button>
  );
}
