import { useState } from "react";

export default function DemographicsForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        age: "",
        income: "",
        familySize: "",
        expenses: "", 
        food: "",
        region: "",
        employment: "",
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    
    const getNumericValue = (field, value) => {
        if (!value) return 0;

        switch (field) {
            case "age":
                if (value.includes("Under 18")) return 17;
                if (value.includes("18-24")) return 21;
                if (value.includes("25-34")) return 30;
                if (value.includes("35-44")) return 40;
                if (value.includes("45-54")) return 50;
                if (value.includes("55-64")) return 60;
                return 30; 

            case "income":
                if (value.includes("Less than")) return 50000;
                if (value.includes("100,000 -")) return 175000;
                if (value.includes("250,001 -")) return 375000;
                if (value.includes("500,001 -")) return 750000;
                if (value.includes("1,000,001 -")) return 1500000;
                if (value.includes("Above")) return 2500000;
                return 100000;

            case "familySize":
                if (value.includes("1-2")) return 2;
                if (value.includes("3-4")) return 4;
                if (value.includes("5-6")) return 6;
                if (value.includes("7 or more")) return 8;
                return 4;

            case "food": 
                if (value.includes("Less than 30%")) return 0.25;
                if (value.includes("30-40%")) return 0.35;
                if (value.includes("40-50%")) return 0.45;
                if (value.includes("50-60%")) return 0.55;
                if (value.includes("More than 60%")) return 0.65;
                return 0.4;
            
            case "expenses": 
                 if (value.includes("Less than")) return 50000;
                 if (value.includes("100,000 -")) return 175000;
                 if (value.includes("250,001 -")) return 375000;
                 if (value.includes("500,001 -")) return 600000;
                 if (value.includes("750,001 -")) return 850000;
                 if (value.includes("Above")) return 1200000;
                 return 200000;

            default:
                return 0;
        }
    };

    const handleSubmit = () => {
        if (!formData.age || !formData.income || !formData.region || !formData.employment) {
            alert("Please fill in all required fields.");
            return;
        }
    
        const numericIncome = getNumericValue("income", formData.income);
        const numericExpenses = getNumericValue("expenses", formData.expenses);
        const familySize = getNumericValue("familySize", formData.familySize);
        
        const burdenIndex = numericIncome > 0 ? (numericExpenses / numericIncome) : 1;
        const affordScore = numericIncome > 0 ? ((numericIncome - numericExpenses) / familySize) : 0;
    
        const payload = {
            Age: getNumericValue("age", formData.age),
            Family_Size: familySize,
            Annual_Household_Income: numericIncome,
            Food_Expenditure_Ratio: getNumericValue("food", formData.food),
            Region: formData.region,
            Employment_Sector: formData.employment,
            Education_Affordability_Score: affordScore,
            Economic_Burden_Index: burdenIndex
        };
    
        console.log("Submitting Payload:", payload);
    
        onSubmit(payload);
    };

    return (
        <div className="card">
            <h2>Personal & Household Information</h2>
            <p className="subtitle">Please select the options that best describe your situation.</p>

            {/* Age */}
            <div className="row single">
                <label>Age</label>
                <select value={formData.age} onChange={(e) => handleChange("age", e.target.value)}>
                    <option value="">Select age range</option>
                    <option>Under 18 years old</option>
                    <option>18-24 years old (College age)</option>
                    <option>25-34 years old (Young professional)</option>
                    <option>35-44 years old (Established career)</option>
                    <option>45-54 years old (Mid-career)</option>
                    <option>55-64 years old (Late career)</option>
                </select>
            </div>

            {/* Income */}
            <div className="row single">
                <label>Total Annual Household Income</label>
                <select value={formData.income} onChange={(e) => handleChange("income", e.target.value)}>
                    <option value="">Select income range</option>
                    <option>Less than ₱100,000/year (Below minimum wage)</option>
                    <option>₱100,000 - ₱250,000/year (Minimum wage earners)</option>
                    <option>₱250,001 - ₱500,000/year (Lower middle income)</option>
                    <option>₱500,001 - ₱1,000,000/year (Middle income)</option>
                    <option>₱1,000,001 - ₱2,000,000/year (Upper middle income)</option>
                    <option>Above ₱2,000,000/year (High income)</option>
                </select>
            </div>

            {/* Family Size */}
            <div className="row single">
                <label>Total Family Size</label>
                <select value={formData.familySize} onChange={(e) => handleChange("familySize", e.target.value)}>
                    <option value="">Select family size</option>
                    <option>1-2 members (Small family)</option>
                    <option>3-4 members (Average family)</option>
                    <option>5-6 members (Large family)</option>
                    <option>7 or more members (Extended family)</option>
                </select>
            </div>

            {/* Expenses */}
            <div className="row single">
                <label>Estimated Annual Expenses</label>
                <select value={formData.expenses} onChange={(e) => handleChange("expenses", e.target.value)}>
                    <option value="">Select expense range</option>
                    <option>Less than ₱100,000/year</option>
                    <option>₱100,000 - ₱250,000/year</option>
                    <option>₱250,001 - ₱500,000/year</option>
                    <option>₱500,001 - ₱750,000/year</option>
                    <option>₱750,001 - ₱1,000,000/year</option>
                    <option>Above ₱1,000,000/year</option>
                </select>
            </div>

            {/* Food */}
            <div className="row single">
                <label>Annual Food Expenditure</label>
                <select value={formData.food} onChange={(e) => handleChange("food", e.target.value)}>
                    <option value="">Select food expenditure</option>
                    <option>Less than 30% (Comfortable)</option>
                    <option>30-40% (Moderate)</option>
                    <option>40-50% (Constrained)</option>
                    <option>50-60% (Tight budget)</option>
                    <option>More than 60% (Struggling)</option>
                </select>
            </div>

            {/* Region */}
            <div className="row single">
                <label>Region</label>
                <select value={formData.region} onChange={(e) => handleChange("region", e.target.value)}>
                    <option value="">Select region</option>
                    <option>NCR</option>
                    <option>Region I</option>
                    <option>Region II</option>
                    <option>Region III</option>
                    <option>Region IV-A</option>
                    <option>Region IV-B</option>
                    <option>Region V</option>
                    <option>Region VI</option>
                    <option>Region VII</option>
                    <option>Region VIII</option>
                    <option>Region IX</option>
                    <option>Region X</option>
                    <option>Region XI</option>
                    <option>Region XII</option>
                    <option>Region XIII</option>
                    <option>CAR</option>
                    <option>BARMM</option>
                </select>
            </div>

            {/* Employment */}
            <div className="row single">
                <label>Employment Sector</label>
                <select value={formData.employment} onChange={(e) => handleChange("employment", e.target.value)}>
                    <option value="">Select employment sector</option>
                    <option>Government</option>
                    <option>Private</option>
                    <option>Self-employed</option>
                    <option>Agriculture</option>
                    <option>Education</option>
                    <option>Healthcare</option>
                    <option>IT</option>
                    <option>Manufacturing</option>
                    <option>Retail</option>
                    <option>Construction</option>
                    <option>Transportation</option>
                    <option>Unemployed</option>
                    <option>Student</option>
                    <option>Retired</option>
                    <option>Other</option>
                </select>
            </div>

            <button className="primary" onClick={handleSubmit}>
                Get Recommendation
            </button>
        </div>
    );
}