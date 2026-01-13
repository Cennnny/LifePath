import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import predictRoutes from './src/routes/predictRoutes.js'; 

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api', predictRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Python script path: ${process.cwd()}/src/models/predict.py`); 
});