import { Request, Response, NextFunction } from 'express';

// Define a custom error handler middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error message in console
  console.error(err.stack);

  // Define a generic error response
  const response = {
    message: err.message || 'Internal Server Error',
    // Provide additional information in non-production environments
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  };

  // Determine the appropriate status code
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // Send the error response
  res.status(statusCode).json(response);
};
