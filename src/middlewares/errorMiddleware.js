"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Define a custom error handler middleware
const errorHandler = (err, req, res, next) => {
    // Log error message in console
    console.error(err.stack);
    // Define a generic error response
    const response = Object.assign({ message: err.message || 'Internal Server Error' }, (process.env.NODE_ENV !== 'production' && { stack: err.stack }));
    // Determine the appropriate status code
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    // Send the error response
    res.status(statusCode).json(response);
};
exports.errorHandler = errorHandler;
