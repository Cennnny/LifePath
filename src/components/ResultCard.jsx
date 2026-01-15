import React from "react";
import "./GradeResults.css";

export default function ResultCard({ result, onRetry, formData }) {
  
  const recommendation = result || "No Result";
  const incomeText = formData?.income || "your income goals";
  const expenseText = formData?.expenses || "your spending habits";

  return (
      // Added 'result-center' class to center this card's content
      <div className="card result-center">
          
          <h2 className="result-header">
            Recommended Education Level
          </h2>
          
          <div className="result-value">
              {recommendation}
          </div>

          <div className="result-context">
            <p>
              Based on your financial goals (<strong>{incomeText}</strong>) and 
              lifestyle preferences (<strong>{expenseText}</strong>), our model suggests 
              that this educational level is statistically sufficient to achieve this lifestyle.
            </p>
          </div>

          <small className="disclaimer">
              *This prediction is based on statistical patterns from our dataset and is intended 
              for educational planning purposes only.
          </small>

          <button className="primary" onClick={onRetry}>
              Try Again
          </button>
      </div>
  );
}