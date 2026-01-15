import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getPrediction = (req, res) => {
    const inputData = req.body;
    
    console.log('Controller received:', inputData);

    const regionMap = {
        "NCR": 0,
        "Region I": 1,
        "Region II": 2,
        "Region III": 3,
        "Region IV-A": 4,
        "Region IV-B": 5,
        "Region V": 6,
        "Region VI": 7,
        "Region VII": 8,
        "Region VIII": 9,
        "Region IX": 10,
        "Region X": 11,
        "Region XI": 12,
        "Region XII": 13,
        "Region XIII": 14,
        "CAR": 15,
        "BARMM": 16
    };

    const employmentMap = {
        "Government": 0,
        "Private": 1,
        "Self-employed": 2,
        "Agriculture": 3,
        "Education": 4,
        "Healthcare": 5,
        "IT": 6,
        "Manufacturing": 7,
        "Retail": 8,
        "Construction": 9,
        "Transportation": 10,
        "Unemployed": 11,
        "Student": 12,
        "Retired": 13,
        "Other": 14
    };

    const pythonInput = {
        Age: inputData.Age || 30,
        Family_Size: inputData.Family_Size || 4,
        Annual_Household_Income: inputData.Annual_Household_Income || 100000,
        Food_Expenditure_Ratio: inputData.Food_Expenditure_Ratio || 0.4,
        Region: regionMap[inputData.Region] !== undefined ? regionMap[inputData.Region] : 0,
        Employment_Sector: employmentMap[inputData.Employment_Sector] !== undefined ? employmentMap[inputData.Employment_Sector] : 0,
        Education_Affordability_Score: inputData.Education_Affordability_Score || 0,
        Economic_Burden_Index: inputData.Economic_Burden_Index || 1
    };

    console.log('Sending to Python:', pythonInput);

    const scriptPath = path.join(__dirname, '..', 'models', 'predict.py');
    const pythonProcess = spawn('python', [scriptPath, JSON.stringify(pythonInput)]);

    let dataString = '';
    let errorString = '';

    pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
        console.error('Python stderr:', data.toString());
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error('Python process failed with code:', code);
            console.error('Error details:', errorString);
            return res.status(500).json({ 
                error: 'Python script failed', 
                details: errorString 
            });
        }

        try {
            console.log('Python output:', dataString);
            const result = JSON.parse(dataString);
            res.json(result);
        } catch (error) {
            console.error('Failed to parse JSON:', dataString);
            res.status(500).json({ 
                error: 'Invalid Python output', 
                details: dataString,
                parseError: error.message
            });
        }
    });
};