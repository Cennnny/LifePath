export default function DemographicsForm() {
    return (
        <div className="card">
            <h2>Personal & Household Information</h2>

            {/* Age */}
            <label>Age</label>
            <select>
                <option value="">Select age range</option>
                <option>Under 18 years old</option>
                <option>18-24 years old (College age)</option>
                <option>25-34 years old (Young professional)</option>
                <option>35-44 years old (Established career)</option>
                <option>45-54 years old (Mid-career)</option>
                <option>55-64 years old (Late career)</option>
            </select>

            {/* Income */}
            <label>Total Annual Household Income</label>
            <select>
                <option value="">Select income range</option>
                <option>Less than ₱100,000/year (Below minimum wage)</option>
                <option>₱100,000 - ₱250,000/year (Minimum wage earners)</option>
                <option>₱250,001 - ₱500,000/year (Lower middle income)</option>
                <option>₱500,001 - ₱1,000,000/year (Middle income)</option>
                <option>₱1,000,001 - ₱2,000,000/year (Upper middle income)</option>
                <option>Above ₱2,000,000/year (High income)</option>
            </select>

            {/* Family Size */}
            <label>Total Family Size</label>
            <select>
                <option value="">Select family size</option>
                <option>1-2 members (Small family)</option>
                <option>3-4 members (Average family)</option>
                <option>5-6 members (Large family)</option>
                <option>7 or more members (Extended family)</option>
            </select>

            {/* Expenses */}
            <label>Estimated Annual Expenses</label>
            <select>
                <option value="">Select expense range</option>
                <option>Less than ₱100,000/year</option>
                <option>₱100,000 - ₱250,000/year</option>
                <option>₱250,001 - ₱500,000/year</option>
                <option>₱500,001 - ₱750,000/year</option>
                <option>₱750,001 - ₱1,000,000/year</option>
                <option>Above ₱1,000,000/year</option>
            </select>

            {/* Food Expenditure */}
            <label>Annual Food Expenditure</label>
            <select>
                <option value="">Select food expenditure</option>
                <option>Less than 30% (Comfortable - mostly discretionary spending)</option>
                <option>30-40% (Moderate - balanced budget)</option>
                <option>40-50% (Constrained - limited savings)</option>
                <option>50-60% (Tight budget - survival mode)</option>
                <option>More than 60% (Struggling - no savings)</option>
            </select>

            {/* Region */}
            <label>Region</label>
            <select>
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

            {/* Employment */}
            <label>Employment Sector</label>
            <select>
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

            <button className="primary">Next</button>
        </div>
    );
}
