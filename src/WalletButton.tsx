import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { sepolia } from "thirdweb/chains";

export default function WalletButton() {
  const account = useActiveAccount();
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: sepolia,
    address: account?.address,
  });

  return (
    <div className="wallet-container">
      <ConnectButton client={client} />
      
      {account && (
        <div className="wallet-info">
          <p>Address: {account.address}</p>
          {!isLoading && balance && (
            <p>Balance: {balance.displayValue} {balance.symbol}</p>
          )}
        </div>
      )}
    </div>
  );
}
