 export default function MatrixProgress({ stage }) {
  const stages = [
    { level: 1, payout: 14700, entry: 1000 },
    { level: 2, payout: 3675, entry: 3675 },
    { level: 3, payout: 13505, entry: 13505 },
    {
      level: 4,
      payout: 33763,
      entry: 33763,
      deduction: 20000,
    },
    {
      level: 5,
      payout: 84407,
      entry: 84407,
      deduction: 20000,
    },
    {
      level: 6,
      payout: 211018,
      entry: 211018,
      deduction: 20000,
    },
    {
      level: 7,
      payout: 10000000,
      entry: 10000000,
      deduction: 20000,
    },
  ];

  const currentStage =
    stages.find((s) => s.level === stage) || stages[0];
  const userPayout = currentStage.payout * 0.5;

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Matrix Progress</h2>
      <div style={styles.stageIndicator}>
        <div style={styles.stageBar}>
          {stages.map((s, index) => (
            <div
              key={s.level}
              style={{
                ...styles.stageDot,
                backgroundColor:
                  stage >= s.level ? "#3498db" : "#e0e0e0",
                left: `${(index / (stages.length - 1)) * 100}%`,
              }}
            >
              <span style={styles.stageNumber}>
                {s.level}
              </span>
            </div>
          ))}
          <div
            style={{
              ...styles.progressLine,
              width: `${((stage - 1) / (stages.length - 1)) * 100}%`,
            }}
          />
        </div>
        <p style={styles.currentStage}>
          Current Stage: {stage}
        </p>
      </div>
      <div style={styles.stageDetails}>
        <div style={styles.detailCard}>
          <h4 style={styles.detailTitle}>Stage Entry</h4>
          <p style={styles.detailValue}>
            ₦{currentStage.entry.toLocaleString()}
          </p>
        </div>
        <div style={styles.detailCard}>
          <h4 style={styles.detailTitle}>Your Payout</h4>
          <p style={styles.detailValue}>
            ₦{userPayout.toLocaleString()}
          </p>
        </div>
      </div>
      {currentStage.deduction && (
        <div style={styles.deductionNotice}>
          <p style={styles.deductionText}>
            <strong>Stage {stage} Note:</strong> ₦
            {currentStage.deduction.toLocaleString()}
            will be deducted for re-entry into Stage 1
          </p>
        </div>
      )}
      {stage === 7 && (
        <div style={styles.finalStage}>
          <h4 style={styles.finalTitle}>
            Stage 7 Completion
          </h4>
          <p style={styles.finalText}>
            You will receive ₦10,000,000 cash payout! The
            remaining balance will be used for token buyback
            and burn.
          </p>
        </div>
      )}
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  heading: {
    fontSize: "22px",
    marginBottom: "20px",
    color: "#2c3e50",
    textAlign: "center",
  },
  stageIndicator: {
    marginBottom: "30px",
  },
  stageBar: {
    height: "30px",
    backgroundColor: "#f0f3f5",
    borderRadius: "15px",
    position: "relative",
    marginBottom: "10px",
  },
  stageDot: {
    position: "absolute",
    top: "-10px",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    border: "2px solid #fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
  stageNumber: {
    color: "white",
    fontWeight: "bold",
    fontSize: "14px",
  },
  progressLine: {
    position: "absolute",
    height: "10px",
    backgroundColor: "#3498db",
    top: "10px",
    left: 0,
    borderRadius: "5px",
    zIndex: 1,
  },
  currentStage: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#3498db",
    fontSize: "18px",
  },
  stageDetails: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "20px",
  },
  detailCard: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    border: "1px solid #e1e5eb",
  },
  detailTitle: {
    fontSize: "14px",
    margin: "0 0 5px 0",
    color: "#7f8c8d",
  },
  detailValue: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: 0,
    color: "#2c3e50",
  },
  deductionNotice: {
    backgroundColor: "#fef9e7",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
    borderLeft: "4px solid #f39c12",
  },
  deductionText: {
    margin: 0,
    fontSize: "14px",
    color: "#d35400",
  },
  finalStage: {
    backgroundColor: "#e8f4f8",
    padding: "15px",
    borderRadius: "10px",
    borderLeft: "4px solid #3498db",
  },
  finalTitle: {
    margin: "0 0 10px 0",
    color: "#2980b9",
    fontSize: "16px",
  },
  finalText: {
    margin: 0,
    fontSize: "14px",
    color: "#2c3e50",
  },
};
