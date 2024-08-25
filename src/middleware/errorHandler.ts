import { Request, Response, NextFunction } from 'express';

// Basic error handling middleware
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', err.message);
  // Respond with a 500 status code and error message
  res.status(500).json({
    message: 'An unexpected error occurred',
  });
}
