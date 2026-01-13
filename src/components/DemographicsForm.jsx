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

    const handleSubmit = () => {
        // Basic validation
        if (!formData.age || !formData.income) {
            alert("Please fill in all required fields.");
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="card">
            <h2>Personal & Household Information</h2>
            <p className="subtitle">Please select the options that best describe your situation.</p>

            {/* Age */}
            <div className="row single">
                <label>Age</label>
                <select onChange={(e) => handleChange("age", e.target.value)}>
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
                <select onChange={(e) => handleChange("income", e.target.value)}>
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
                <select onChange={(e) => handleChange("familySize", e.target.value)}>
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
                <select onChange={(e) => handleChange("expenses", e.target.value)}>
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
                <select onChange={(e) => handleChange("food", e.target.value)}>
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
                <select onChange={(e) => handleChange("region", e.target.value)}>
                    <option value="">Select region</option>
                    <option>NCR (National Capital Region)</option>
                    <option>Region I (Ilocos Region)</option>
                    <option>Region II (Cagayan Valley)</option>
                    <option>Region III (Central Luzon)</option>
                    <option>Region IV-A (CALABARZON)</option>
                    <option>Region IV-B (MIMAROPA)</option>
                    <option>Region V (Bicol Region)</option>
                    <option>Region VI (Western Visayas)</option>
                    <option>Region VII (Central Visayas)</option>
                    <option>Region VIII (Eastern Visayas)</option>
                    <option>Region IX (Zamboanga Peninsula)</option>
                    <option>Region X (Northern Mindanao)</option>
                    <option>Region XI (Davao Region)</option>
                    <option>Region XII (SOCCSKSARGEN)</option>
                    <option>Region XIII (Caraga)</option>
                    <option>CAR (Cordillera Administrative Region)</option>
                    <option>BARMM (Bangsamoro Autonomous Region)</option>
                </select>
            </div>

            {/* Employment */}
            <div className="row single">
                <label>Employment Sector</label>
                <select onChange={(e) => handleChange("employment", e.target.value)}>
                    <option value="">Select employment sector</option>
                    <option>Government/Public Sector</option>
                    <option>Private Company/Corporate</option>
                    <option>Self-employed/Business Owner</option>
                    <option>Agriculture/Farming/Fishing</option>
                    <option>Education/Teaching</option>
                    <option>Healthcare/Medical</option>
                    <option>IT/BPO/Technology</option>
                    <option>Manufacturing/Factory</option>
                    <option>Retail/Sales/Services</option>
                    <option>Construction/Skilled Trade</option>
                    <option>Transportation/Delivery</option>
                    <option>Unemployed/Not Working</option>
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