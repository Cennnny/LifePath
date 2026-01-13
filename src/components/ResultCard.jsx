export default function ResultCard({ result, onRetry }) {

  const isGood = result && (result.includes("High") || result.includes("Pass")); 
  
  return (
      <div className="card" style={{ textAlign: "center" }}>
          <h2>Recommendation Result</h2>
          <p className="subtitle">Based on your demographic profile</p>

          <div style={{
              margin: "30px 0",
              padding: "20px",
              background: isGood ? "#dcfce7" : "#fee2e2",
              color: isGood ? "#166534" : "#991b1b",
              borderRadius: "12px",
              fontSize: "24px",
              fontWeight: "bold"
          }}>
              {result}
          </div>

          <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>
              This is an AI-generated prediction based on the data you provided.
          </p>

          <button className="primary" onClick={onRetry}>
              Try Again
          </button>
      </div>
  );
}