import dotenv from 'dotenv';
import express from 'express';
import { getBalanceSheetData } from './api';
import { ROUTES } from './constants/routes';
import { errorHandler } from './middleware/errorHandler';
import cors  from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Define routes
app.get(ROUTES.BALANCE_SHEET, async (req, res, next) => {
  try {
    const balanceSheetData = await getBalanceSheetData();
    res.json(balanceSheetData);
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
});
// Configure CORS
app.use(cors({
  origin: '*', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow methods as needed
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers as needed
}));;

// Use the error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
