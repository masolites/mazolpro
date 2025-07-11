 import { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import AuthForm from "../components/AuthForm";
import PrivateSale from "../components/PrivateSale";
import Mining from "../components/Mining";
import Voting from "../components/Voting";
import ServiceCard from "../components/ServiceCard";
import UserProfile from "../components/UserProfile";
import "../styles/glassmorphism.css";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="glass-bg">
      <header className="header">
        <h1>Mazol Pro</h1>
        <h2>E-commerce & Blockchain</h2>
        <p className="intro">
          Mazol-Pro is a Blockchain supported Platform
          promoting a Better Society Together by offering
          Trusted Systems, Goods & Services to people
        </p>
        <ConnectButton className="glass-btn" />
        <button
          className="glass-btn"
          onClick={() => setShowAuth(true)}
        >
          Sign Up / Sign In
        </button>
      </header>

      {showAuth && (
        <AuthForm onClose={() => setShowAuth(false)} />
      )}

      <main>
        <PrivateSale />
        <Mining />
        <Voting />
        <section className="services">
          <ServiceCard title="Deposit" />
          <ServiceCard title="Withdrawal" />
          <ServiceCard title="Escrow Buy & Sell" />
          <ServiceCard title="Send/Receive Token" />
          <ServiceCard title="My Commission" />
          <ServiceCard title="Swap User" />
          <ServiceCard title="Staking" />
        </section>
        <UserProfile />
      </main>

      <footer>
        <a href="/admin">Admin Dashboard</a> &nbsp;|&nbsp;
        &copy; 2024 Mazol Pro
      </footer>
    </div>
  );
}
