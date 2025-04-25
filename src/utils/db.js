"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initilize the DB
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
// Function to query the database
const query = (text, params) => {
    return exports.pool.query(text, params);
};
exports.query = query;
