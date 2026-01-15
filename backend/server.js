import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import predictRoutes from './src/routes/predictRoutes.js'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log('Request received:', {
        method: req.method,
        url: req.url,
        body: req.body,
        contentType: req.headers['content-type']
    });
    next();
});

app.use('/api', predictRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Python script path: ${process.cwd()}/src/models/predict.py`);
});