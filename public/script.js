// Registration
document
  .getElementById("register-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById(
      "register-email",
    ).value;
    const password = document.getElementById(
      "register-password",
    ).value;
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "register",
        email,
        password,
      }),
    });
    const data = await res.json();
    document.getElementById("auth-result").innerText =
      data.message || data.error || "";
  });

// Login
document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const email =
      document.getElementById("login-email").value;
    const password = document.getElementById(
      "login-password",
    ).value;
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "login",
        email,
        password,
      }),
    });
    const data = await res.json();
    if (data.user) {
      localStorage.setItem(
        "user",
        JSON.stringify(data.user),
      );
      showDashboard(data.user);
    }
    document.getElementById("auth-result").innerText =
      data.message || data.error || "";
  });

// Wallet Connect
document.getElementById("connect-wallet-btn").onclick =
  async function () {
    const { MetamaskWallet } = window.thirdwebWallets;
    const wallet = new MetamaskWallet();
    await wallet.connect();
    const address = await wallet.getAddress();
    let user = JSON.parse(
      localStorage.getItem("user") || "{}",
    );
    user.wallet = address;
    localStorage.setItem("user", JSON.stringify(user));
    document.getElementById("wallet-address").innerText =
      "Connected: " + address;
  };

// Show Dashboard
function showDashboard(user) {
  document.getElementById("auth-section").style.display =
    "none";
  document.getElementById("dashboard").style.display =
    "block";
  document.getElementById("user-email").innerText =
    user.email;
  document.getElementById("wallet-address").innerText =
    user.wallet ? "Wallet: " + user.wallet : "";
  document.getElementById("user-balance").innerText =
    `Naira: ₦${user.nairaBalance || 0} | USDT: ${user.usdtBalance || 0}`;
  updateTokenPrice();
  updatePrivateSaleCounter();
  fetchMatrixStatus();
}

// Buy Modal
document.getElementById("buy-btn").onclick = function () {
  document.getElementById("buy-modal").style.display =
    "block";
};
document.getElementById("close-buy-modal").onclick =
  function () {
    document.getElementById("buy-modal").style.display =
      "none";
  };
document
  .getElementById("buy-method")
  .addEventListener("change", function () {
    const isManual = this.value === "manual";
    document.getElementById(
      "buy-proof-label",
    ).style.display = isManual ? "block" : "none";
    document.getElementById(
      "manual-bank-info",
    ).style.display = isManual ? "block" : "none";
  });
document
  .getElementById("buy-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const user = JSON.parse(
      localStorage.getItem("user") || "{}",
    );
    const amount =
      document.getElementById("buy-amount").value;
    const type = document.getElementById("buy-type").value;
    const method =
      document.getElementById("buy-method").value;
    const proof =
      document.getElementById("buy-proof").value;
    const res = await fetch("/api/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        wallet: user.wallet,
        amount,
        method,
        proof,
      }),
    });
    const data = await res.json();
    document.getElementById("buy-result").innerText =
      data.message || data.error || "";
    updatePrivateSaleCounter();
  });

// Token Price Display
async function updateTokenPrice() {
  try {
    const res = await fetch("/api/status");
    const data = await res.json();
    document.getElementById("token-price").textContent =
      `₦${data.tokenPrice || "0.00"}`;
  } catch {
    document.getElementById("token-price").textContent =
      "₦0.00";
  }
}

// Live Private Sale Counter
async function updatePrivateSaleCounter() {
  try {
    const res = await fetch("/api/status");
    const data = await res.json();
    document.getElementById(
      "sale-tokens-sold",
    ).textContent = data.totalSold?.toLocaleString() || "0";
    document.getElementById(
      "sale-tokens-goal",
    ).textContent = data.goal?.toLocaleString() || "0";
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
setInterval(updatePrivateSaleCounter, 10000);

// Mining
let miningInterval = null;
let miningStart = Date.now();
const miningDuration = 90 * 24 * 60 * 60 * 1000;
function updateMiningDaysLeft() {
  const now = Date.now();
  const daysLeft = Math.max(
    0,
    Math.ceil(
      (miningStart + miningDuration - now) /
        (24 * 60 * 60 * 1000),
    ),
  );
  document.getElementById("mining-days-left").textContent =
    daysLeft;
}
updateMiningDaysLeft();
setInterval(updateMiningDaysLeft, 3600000);

async function startMining() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}",
  );
  const res = await fetch("/api/mining", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet: user.wallet }),
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

// Matrix Progression
async function fetchMatrixStatus() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}",
  );
  const res = await fetch("/api/matrix", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet: user.wallet }),
  });
  const data = await res.json();
  document.getElementById("matrix-status").innerText =
    data.message || data.error || "";
}

// Voting
document
  .getElementById("vote-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const user = JSON.parse(
      localStorage.getItem("user") || "{}",
    );
    const price =
      document.getElementById("vote-price").value;
    const res = await fetch("/api/voting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price, wallet: user.wallet }),
    });
    const data = await res.json();
    document.getElementById("vote-result").innerText =
      data.message || data.error || "";
  });

// Withdraw
function withdraw() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}",
  );
  fetch("/api/withdraw", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet: user.wallet }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("withdraw-result").innerText =
        data.message || data.error || "";
    });
}

// Escrow
document
  .getElementById("escrow-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const user = JSON.parse(
      localStorage.getItem("user") || "{}",
    );
    const counterparty = document.getElementById(
      "escrow-counterparty",
    ).value;
    const amount =
      document.getElementById("escrow-amount").value;
    const product = document.getElementById(
      "escrow-product",
    ).value;
    const res = await fetch("/api/escrow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wallet: user.wallet,
        counterparty,
        amount,
        product,
      }),
    });
    const data = await res.json();
    document.getElementById("escrow-result").innerText =
      data.message || data.error || "";
  });
