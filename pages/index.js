// pages/index.js

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7f7f7",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#1a202c" }}>
        MAZOL-Pro
      </h1>
      <h2
        style={{
          fontWeight: 400,
          color: "#4a5568",
          marginTop: "0.5rem",
        }}
      >
        E-commerce & Blockchain
      </h2>
      <p
        style={{
          marginTop: "2rem",
          color: "#2d3748",
          fontSize: "1.2rem",
        }}
      >
        Welcome to the MAZOL-Pro platform.
        <br />
        Your affiliate, private sale, mining, voting, and
        wallet features are ready for production.
      </p>
    </main>
  );
}
