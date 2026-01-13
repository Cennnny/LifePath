import { useState } from "react";
import DemographicsForm from "./components/DemographicsForm";
import ResultCard from "./components/ResultCard";
import "./components/GradeResults.css"; 

export default function App() {
    const [view, setView] = useState("form");  'result'
    const [prediction, setPrediction] = useState(null);

    const handlePredict = async (formData) => {
        setView("loading");

        try {
            //Send data to Node.js backend
            const response = await fetch("http://localhost:5000/api/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
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
                <div className="card" style={{textAlign: 'center'}}>
                    <h2>Analyzing...</h2>
                    <div className="spinner"></div> {}
                    <p className="subtitle">Please wait while we calculate your recommendation.</p>
                </div>
            )}

            {view === "result" && (
                <ResultCard 
                    result={prediction} 
                    onRetry={() => setView("form")} 
                />
            )}
        </div>
    );
}