"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const VALID_TOKEN = 'test_valid_token'; // Replace with your actual token for production
// Define a simple token check middleware
const checkToken = (req, res, next) => {
    const token = req.headers['authorization'];
    // Check if the token matches the valid token
    if (token !== VALID_TOKEN) {
        return res.status(401).json({ error: 'Forbidden: Invalid token' });
    }
    // If token is valid, proceed to the next middleware or route handler
    next();
};
exports.checkToken = checkToken;
