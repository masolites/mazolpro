 // Live Private Sale Counter
async function updatePrivateSaleCounter() {
  try {
    const res = await fetch(
      "/.netlify/functions/private_sale_status",
    );
    const data = await res.json();
    document.getElementById(
      "sale-tokens-sold",
    ).textContent = data.totalSold.toLocaleString();
    document.getElementById(
      "sale-tokens-goal",
    ).textContent = data.goal.toLocaleString();

    // Countdown timer
    const endTime = new Date(data.endTime).getTime();
    function updateTimer() {
      const now = Date.now();
      let diff = Math.max(0, endTime - now);
      const hours = String(
        Math.floor(diff / 3600000),
      ).padStart(2, "0");
      const mins = String(
        Math.floor((diff % 3600000) / 60000),
      ).padStart(2, "0");
      const secs = String(
        Math.floor((diff % 60000) / 1000),
      ).padStart(2, "0");
      document.getElementById("sale-timer").textContent =
        `${hours}:${mins}:${secs}`;
      if (diff > 0) setTimeout(updateTimer, 1000);
    }
    updateTimer();
  } catch (e) {
    document.getElementById(
      "sale-tokens-sold",
    ).textContent = "—";
    document.getElementById(
      "sale-tokens-goal",
    ).textContent = "—";
    document.getElementById("sale-timer").textContent = "—";
  }
}
updatePrivateSaleCounter();
setInterval(updatePrivateSaleCounter, 10000); // Refresh every 10s

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

// Live Mining Counter
let miningInterval = null;
async function startMining() {
  const wallet =
    localStorage.getItem("wallet") || "demo-wallet"; // Replace with real wallet logic
  const res = await fetch("/.netlify/functions/mining", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet }),
  });
  const data = await res.json();
  document.getElementById("mining-status").innerText =
    data.message || data.error || "";
  if (data.session) {
    showMiningCounter(
      data.session.start,
      data.session.speed,
    );
  }
}
function showMiningCounter(startTime, speed) {
  clearInterval(miningInterval);
  document.getElementById("mining-speed").textContent =
    speed === 3 ? "Gold 🥇" : "Silver 🥈";
  function updateMiningTimer() {
    const now = Date.now();
    const start = new Date(startTime).getTime();
    let diff = Math.max(0, now - start);
    const hours = String(
      Math.floor(diff / 3600000),
    ).padStart(2, "0");
    const mins = String(
      Math.floor((diff % 3600000) / 60000),
    ).padStart(2, "0");
    const secs = String(
      Math.floor((diff % 60000) / 1000),
    ).padStart(2, "0");
    document.getElementById("mining-timer").textContent =
      `${hours}:${mins}:${secs}`;
  }
  updateMiningTimer();
  miningInterval = setInterval(updateMiningTimer, 1000);
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
