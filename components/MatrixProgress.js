 const STAGES = [
  { id: 1, payout: 14700 },
  { id: 2, payout: 3675 },
  { id: 3, payout: 13505 },
  { id: 4, payout: 33763, deduction: 20000 },
  { id: 5, payout: 84407, deduction: 20000 },
  { id: 6, payout: 211018, deduction: 20000 },
  { id: 7, payout: 10000000, deduction: 20000 }
];

export default function MatrixProgress({ stage }) {
  const currentStage = STAGES.find(s => s.id === stage) || STAGES[0];
  
  return (
    <section style={{ marginBottom: '20px' }}>
      <h2>Matrix Progress: Stage {stage}</h2>
      <div style={{
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: '#f9f9f9'
      }}>
        <p>Amount Due: <b>₦{(currentStage.payout * 0.5).toLocaleString()}</b></p>
        {currentStage.deduction && (
          <p>Re-entry Deduction: ₦{currentStage.deduction.toLocaleString()}</p>
        )}
      </div>
    </section>
  );
}
