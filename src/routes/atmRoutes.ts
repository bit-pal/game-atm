import express from 'express';
import {
  withdraw,
  deposit,
  transfer,
  checkBalance,
  transactionHistory,
} from '../controllers/atmController';
import { checkToken } from '../middlewares/authMiddleware';

const router = express.Router();

// Use AuthMiddleware
router.use(checkToken);

// Define Routes
router.post('/withdraw/:playerId', withdraw);
router.post('/deposit/:playerId', deposit);
router.post('/transfer/:fromPlayerId/:toPlayerId', transfer);
router.get('/balance/:playerId', checkBalance);
router.get('/history/:playerId', transactionHistory);

export default router;
