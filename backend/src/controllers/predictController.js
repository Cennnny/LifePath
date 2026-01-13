import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performTranslation = (data) => {

    const ageMap = {
        "Under 18 years old": 17,
        "18-24 years old (College age)": 21,
        "25-34 years old (Young professional)": 29.5,
        "35-44 years old (Established career)": 39.5,
        "45-54 years old (Mid-career)": 49.5,
        "55-64 years old (Late career)": 59.5
    };

    const incomeMap = {
        "Less than ₱100,000/year (Below minimum wage)": 80000,
        "₱100,000 - ₱250,000/year (Minimum wage earners)": 175000,
        "₱250,001 - ₱500,000/year (Lower middle income)": 375000,
        "₱500,001 - ₱1,000,000/year (Middle income)": 750000,
        "₱1,000,001 - ₱2,000,000/year (Upper middle income)": 1500000,
        "Above ₱2,000,000/year (High income)": 2500000
    };

    const familyMap = {
        "1-2 members (Small family)": 1.5,
        "3-4 members (Average family)": 3.5,
        "5-6 members (Large family)": 5.5,
        "7 or more members (Extended family)": 8
    };

    const expenseMap = {
        "Less than ₱100,000/year": 80000,
        "₱100,000 - ₱250,000/year": 175000,
        "₱250,001 - ₱500,000/year": 375000,
        "₱500,001 - ₱750,000/year": 625000,
        "₱750,001 - ₱1,000,000/year": 875000,
        "Above ₱1,000,000/year": 1200000
    };

    const foodMap = {
        "Less than 30% (Comfortable)": 0.25,
        "30-40% (Moderate)": 0.35,
        "40-50% (Constrained)": 0.45,
        "50-60% (Tight budget)": 0.55,
        "More than 60% (Struggling)": 0.65
    };

    const regions = [
        "NCR", "Region I", "Region II", "Region III", "Region IV-A", "Region IV-B",
        "Region V", "Region VI", "Region VII", "Region VIII", "Region IX", "Region X",
        "Region XI", "Region XII", "Region XIII", "CAR", "BARMM"
    ];
    
    let regionCode = regions.findIndex(r => data.region.includes(r));
    if (regionCode === -1) regionCode = 0; 

    const sectors = [
        "Government", "Private", "Self-employed", "Agriculture", "Education", 
        "Healthcare", "IT", "Manufacturing", "Retail", "Construction", 
        "Transportation", "Unemployed", "Student", "Retired", "Other"
    ];
    let empCode = sectors.findIndex(s => data.employment.includes(s.split('/')[0]));
    if (empCode === -1) empCode = 0;

    const incomeVal = incomeMap[data.income] || 100000;
    const expenseVal = expenseMap[data.expenses] || 100000;
    const familyVal = familyMap[data.familySize] || 3;

    const burdenIndex = expenseVal / incomeVal; 
    const affordScore = (incomeVal - expenseVal) / familyVal; 

    return {
        Age: ageMap[data.age] || 30, 
        Family_Size: familyVal,
        Annual_Household_Income: incomeVal,
        Food_Expenditure_Ratio: foodMap[data.food] || 0.4,
        Region: regionCode,
        Employment_Sector: empCode,
        Education_Affordability_Score: affordScore,
        Economic_Burden_Index: burdenIndex
    };
};

export const getPrediction = (req, res) => {
    const rawData = req.body; 

    // Translate before sending to Python
    const pythonInput = performTranslation(rawData);

    // Point to the python script
    const scriptPath = path.join(__dirname, '..', 'models', 'predict.py');

    // Run the Python script with clean numbers
    const pythonProcess = spawn('python', [scriptPath, JSON.stringify(pythonInput)]);

    let dataString = '';

    pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        try {
            const result = JSON.parse(dataString);
            res.json(result);
        } catch (error) {
            console.error("Error parsing JSON:", dataString);
            // Send the raw error to frontend 
            res.status(500).json({ error: "Python Output Error", details: dataString });
        }
    });
};