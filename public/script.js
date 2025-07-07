// script.js

// Purchase (Private Sale)
document
  .getElementById("purchase-form")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const amount = document.getElementById("amount").value;
    const type =
      document.getElementById("purchase-type").value;
    const res = await fetch(
      "/.netlify/functions/purchase_" + type,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      },
    );
    const data = await res.json();
    document.getElementById("purchase-result").innerText =
      data.message || data.error || "";
  });

// Mining
function startMining() {
  fetch("/.netlify/functions/mining", { method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("mining-status").innerText =
        data.message || data.error || "";
    });
}

// Voting
document
  .getElementById("vote-form")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const price =
      document.getElementById("vote-price").value;
    const res = await fetch("/.netlify/functions/voting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price }),
    });
    const data = await res.json();
    document.getElementById("vote-result").innerText =
      data.message || data.error || "";
  });

// Withdraw
function withdraw() {
  fetch("/.netlify/functions/withdraw", { method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("withdraw-result").innerText =
        data.message || data.error || "";
    });
}

// Admin functions (example)
function approveDeposit() {
  fetch("/.netlify/functions/admin", {
    method: "POST",
    body: JSON.stringify({ action: "approveDeposit" }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("approve-result").innerText =
        data.message || data.error || "";
    });
}
function setWithdrawalFee() {
  const fee = document.getElementById(
    "withdrawal-fee",
  ).value;
  fetch("/.netlify/functions/admin", {
    method: "POST",
    body: JSON.stringify({
      action: "setWithdrawalFee",
      fee,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("fee-result").innerText =
        data.message || data.error || "";
    });
}
