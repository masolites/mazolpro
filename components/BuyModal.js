 {
  paymentMethod === "manual" && (
    <div style={{ marginBottom: "15px" }}>
      <div
        style={{
          background: "#fff5e1",
          color: "#4d0000",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "10px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        <div>Bank Details:</div>
        <div>MASSES</div>
        <div>1026664654</div>
        <div>UBA</div>
      </div>
      <label>Date and Time of Payment:</label>
      <input
        type="datetime-local"
        value={paymentDateTime}
        onChange={(e) => setPaymentDateTime(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
        }}
      />
    </div>
  );
}
