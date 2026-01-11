import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreating __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getPrediction = (req, res) => {
    const inputData = req.body; 

    // Point to the python script
    const scriptPath = path.join(__dirname, '..', 'models', 'predict.py');

    // Run the Python script
    const pythonProcess = spawn('python', [scriptPath, JSON.stringify(inputData)]);

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
            res.status(500).json({ error: "Failed to parse Python output" });
        }
    });
};