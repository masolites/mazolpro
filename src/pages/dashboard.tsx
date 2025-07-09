import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import MatrixStatus from "../components/Dashboard/MatrixStatus";
import Earnings from "../components/Dashboard/Earnings";
import Wallet from "../components/Dashboard/Wallet";
import PrivateSale from "../components/Dashboard/PrivateSale";
import Mining from "../components/Dashboard/Mining";
import Voting from "../components/Dashboard/Voting";
import Withdraw from "../components/Dashboard/Withdraw";
import LogoutButton from "../components/LogoutButton";

export default function Dashboard() {
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    // For demo, get wallet from localStorage. In production, use secure session/cookie.
    const user = localStorage.getItem("user");
    if (!user) window.location.href = "/";
    else setWallet(user);
  }, []);

  if (!wallet) return null;

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            Welcome, {wallet}
          </h2>
          <LogoutButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MatrixStatus wallet={wallet} />
          <Earnings wallet={wallet} />
          <Wallet wallet={wallet} />
          <PrivateSale wallet={wallet} />
          <Mining wallet={wallet} />
          <Voting wallet={wallet} />
          <Withdraw wallet={wallet} />
        </div>
      </main>
      <Footer />
    </>
  );
}
