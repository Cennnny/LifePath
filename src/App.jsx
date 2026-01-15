import { useState } from "react";
import DemographicsForm from "./components/DemographicsForm";
import ResultCard from "./components/ResultCard";
import "./components/GradeResults.css"; 

function App() {
    const [view, setView] = useState("form");
    const [prediction, setPrediction] = useState(null);

    const [formData, setFormData] = useState(null); 

    const handlePredict = async (dataFromForm) => {
    setFormData(dataFromForm); 
    setView("loading");

        try {
            //Send data to Node.js backend
            const response = await fetch("http://localhost:5000/api/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataFromForm),
            });

            const data = await response.json();

            //Handle the result
            if (data.recommendation) {
                setPrediction(data.recommendation);
                setView("result");
            } else {
                alert("Error: " + (data.error || "Could not get prediction"));
                setView("form");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to connect to the server.");
            setView("form");
        }
    };

    return (
        <div className="page">
        {view === "form" && <DemographicsForm onSubmit={handlePredict} />}
        
        {view === "loading" && (
            <div className="card result-center">
                <h2 style={{ color: "#4b5563" }}>Analyzing Data...</h2>
                <div style={{ margin: "20px 0", fontSize: "14px", color: "#6b7280" }}>
                    Please wait while our model processes your demographics.
                </div>
                
                <div className="spinner" style={{ 
                    margin: "0 auto", 
                    width: "40px", 
                    height: "40px", 
                    border: "4px solid #f3f3f3", 
                    borderTop: "4px solid #6366f1", 
                    borderRadius: "50%", 
                    animation: "spin 1s linear infinite" 
                }}></div>
                <style>{`
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        )}

        {view === "result" && (
            <ResultCard 
                result={prediction} 
                onRetry={() => setView("form")}
                formData={formData} 
            />
        )}
        </div>
    );
}

export default App;