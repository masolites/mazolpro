 export default function Features() {
  return (
    <section
      style={{
        padding: "2rem 1rem",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Features</h2>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "2rem 0",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <li>🔒 Secure Blockchain Integration</li>
        <li>⚡ Fast E-commerce Transactions</li>
        <li>📱 Mobile-Optimized Experience</li>
        <li>💎 Rewards & Mining</li>
        {/* Add more features as needed */}
      </ul>
    </section>
  );
}
