import { Request, Response, NextFunction } from 'express';

const VALID_TOKEN = 'test_valid_token'; // Replace with your actual token for production

// Define a simple token check middleware
export const checkToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.headers['authorization'];

  // Check if the token matches the valid token
  if (token !== VALID_TOKEN) {
    return res.status(401).json({ error: 'Forbidden: Invalid token' });
  }

  // If token is valid, proceed to the next middleware or route handler
  next();
};
