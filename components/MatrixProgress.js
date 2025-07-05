export default function MatrixProgress({ stage }) {
  const stages = [
    { level: 1, payout: 14700 },
    { level: 2, payout: 3675 },
    { level: 3, payout: 13505 },
    { level: 4, payout: 33763, deduction: 20000 },
    { level: 5, payout: 84407, deduction: 20000 },
    { level: 6, payout: 211018, deduction: 20000 },
    { level: 7, payout: 10000000, deduction: 20000 }
  ];

  const currentStage = stages.find(s => s.level === stage) || stages[0];

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Matrix Progress: Stage {stage}</h2>
      <p style={styles.payout}>Amount Due: ₦{(currentStage.payout * 0.5).toLocaleString()}</p>
      {currentStage.deduction && (
        <p style={styles.deduction}>Re-entry Deduction: ₦{currentStage.deduction.toLocaleString()}</p>
      )}
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px'
  },
  heading: {
    fontSize: '20px',
    marginBottom: '10px'
  },
  payout: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  deduction: {
    fontSize: '14px',
    color: '#e74c3c'
  }
};
