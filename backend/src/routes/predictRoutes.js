import express from 'express';
import { getPrediction } from '../controllers/predictController.js';

const router = express.Router();

router.post('/predict', (req, res, next) => {
  if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Invalid JSON body' });
  }
  next();
}, getPrediction);

export default router;