 import { ConnectButton } from "thirdweb/react";

export default function Header({ onAuthClick }) {
  return (
    <header>
      <h1>Mazol Pro</h1>
      <h2>E-commerce & Blockchain</h2>
      <p>
        Mazol-Pro is a Blockchain supported Platform
        promoting a Better Society Together by offering
        Trusted Systems, Goods & Services to people
      </p>
      <ConnectButton />
      <button onClick={onAuthClick}>
        Sign Up / Sign In
      </button>
    </header>
  );
}
