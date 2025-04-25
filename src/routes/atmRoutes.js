"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const atmController_1 = require("../controllers/atmController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Use AuthMiddleware
router.use(authMiddleware_1.checkToken);
// Define Routes
router.post('/withdraw/:playerId', atmController_1.withdraw);
router.post('/deposit/:playerId', atmController_1.deposit);
router.post('/transfer/:fromPlayerId/:toPlayerId', atmController_1.transfer);
router.get('/balance/:playerId', atmController_1.checkBalance);
router.get('/history/:playerId', atmController_1.transactionHistory);
exports.default = router;
