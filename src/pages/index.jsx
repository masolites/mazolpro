 import { useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import Header from "../components/Header";
import AuthModal from "../components/AuthModal";
import PrivateSaleCard from "../components/PrivateSaleCard";
import MiningCard from "../components/MiningCard";
import VotingCard from "../components/VotingCard";
import DepositCard from "../components/DepositCard";
import WithdrawalCard from "../components/WithdrawalCard";
import EscrowCard from "../components/EscrowCard";
// ... import other cards as needed

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <AuthProvider>
      <Header onAuthClick={() => setShowAuth(true)} />
      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} />
      )}
      <main>
        <PrivateSaleCard />
        <MiningCard />
        <VotingCard />
        <DepositCard />
        <WithdrawalCard />
        <EscrowCard />
        {/* Add Send/Receive, My Commission, Swap User, Staking cards here */}
      </main>
    </AuthProvider>
  );
}
