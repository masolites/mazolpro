import React, { useEffect, useState } from "react";

export default function VotingAnnouncement() {
  const [voting, setVoting] = useState({
    currentPrice: "₦1.4",
    votingWindow: "6pm–11pm WAT",
    nextPrice: "To be announced",
    canVote: false,
  });

  // Fetch voting status from API if needed

  return (
    <div className="voting-announcement">
      <h2>Current Price: {voting.currentPrice}</h2>
      <p>Voting Window: {voting.votingWindow}</p>
      <p>Next Price: {voting.nextPrice}</p>
      {voting.canVote && (
        <button>Vote on Tomorrow’s Price</button>
      )}
    </div>
  );
}
