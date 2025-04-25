"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionHistory = exports.checkBalance = exports.transfer = exports.deposit = exports.withdraw = void 0;
const playerService_1 = require("../services/playerService");
const transactionService_1 = require("../services/transactionService");
/**
 * Handles withdrawal of funds for a player.
 *
 * @param {Request} req - The request object, containing player ID and withdrawal amount.
 * @param {Response} res - The response object used to send back the anticipated HTTP responses.
 * @returns {Promise<any>} - A promise that resolves when the operation is complete.
 */
const withdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playerId = parseInt(req.params.playerId);
    const { amount } = req.body;
    try {
        if (Number(amount) <= 0) {
            // Check the amount is greater than 0
            return res.status(400).json({ error: 'Amount must be greater than 0' });
        }
        const player = yield playerService_1.PlayerService.getPlayer(playerId);
        if (!player) {
            // Check the player is exist
            return res.status(400).json({ error: 'Player not found' });
        }
        const balance = yield playerService_1.PlayerService.getPlayerBalance(playerId);
        if (balance < amount) {
            // Check the balance is greater than amount
            return res.status(400).json({ error: 'Insufficient balance' });
        }
        yield playerService_1.PlayerService.updatePlayerBalance(playerId, -amount);
        yield transactionService_1.TransactionService.logTransaction(playerId, 'withdraw', amount);
        return res
            .status(200)
            .json({ message: 'Withdrawal successful', newBalance: balance - amount });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.withdraw = withdraw;
/**
 * Handles deposit of funds for a player.
 *
 * @param {Request} req - The request object, containing player ID and deposit amount.
 * @param {Response} res - The response object used to send back the anticipated HTTP responses.
 * @returns {Promise<any>} - A promise that resolves when the operation is complete.
 */
const deposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playerId = parseInt(req.params.playerId);
    const { amount } = req.body;
    try {
        if (Number(amount) <= 0) {
            // Check the amount is greater than 0
            return res.status(400).json({ error: 'Amount must be greater than 0' });
        }
        const player = yield playerService_1.PlayerService.getPlayer(playerId);
        if (!player) {
            // Check the player is exist
            return res.status(400).json({ error: 'Player not found' });
        }
        yield playerService_1.PlayerService.updatePlayerBalance(playerId, amount);
        yield transactionService_1.TransactionService.logTransaction(playerId, 'deposit', amount);
        const newBalance = yield playerService_1.PlayerService.getPlayerBalance(playerId);
        return res.status(200).json({ message: 'Deposit successful', newBalance });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deposit = deposit;
/**
 * Handles the transfer of funds between two players.
 *
 * @param {Request} req - The request object, containing IDs of both players and the transfer amount.
 * @param {Response} res - The response object used to send back the anticipated HTTP responses.
 * @returns {Promise<any>} - A promise that resolves when the operation is complete.
 */
const transfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fromPlayerId = parseInt(req.params.fromPlayerId);
    const toPlayerId = parseInt(req.params.toPlayerId);
    const { amount } = req.body;
    try {
        if (amount <= 0) {
            // Check the amount is greater than 0
            return res
                .status(400)
                .json({ message: 'Transfer amount must be greater than zero' });
        }
        const fromPlayer = yield playerService_1.PlayerService.getPlayer(fromPlayerId);
        if (!fromPlayer) {
            // Check the player is exist
            return res.status(400).json({ error: 'From Player not found' });
        }
        const toPlayer = yield playerService_1.PlayerService.getPlayer(toPlayerId);
        if (!toPlayer) {
            // Check the player is exist
            return res.status(400).json({ error: 'To Player not found' });
        }
        const balance = yield playerService_1.PlayerService.getPlayerBalance(fromPlayerId);
        if (balance < amount) {
            // Check the balance is greater than amount
            return res.status(400).json({ error: 'Insufficient balance' });
        }
        yield playerService_1.PlayerService.transferMoney(fromPlayerId, toPlayerId, amount);
        return res.status(200).json({ message: 'Transfer successful' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.transfer = transfer;
/**
 * Retrieves the balance for a specified player.
 *
 * @param {Request} req - The request object, containing the player ID.
 * @param {Response} res - The response object used to send back the anticipated HTTP responses.
 * @returns {Promise<any>} - A promise that resolves with the player's balance.
 */
const checkBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playerId = parseInt(req.params.playerId);
    try {
        const player = yield playerService_1.PlayerService.getPlayer(playerId);
        if (!player) {
            // Check the player is exist
            return res.status(400).json({ error: 'Player not found' });
        }
        const balance = yield playerService_1.PlayerService.getPlayerBalance(playerId);
        return res.status(200).json({ balance });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.checkBalance = checkBalance;
/**
 * Retrieves the transaction history for a specified player.
 *
 * @param {Request} req - The request object, containing the player ID.
 * @param {Response} res - The response object used to send back the anticipated HTTP responses.
 * @returns {Promise<any>} - A promise that resolves with the player's transaction history.
 */
const transactionHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playerId = parseInt(req.params.playerId);
    try {
        const player = yield playerService_1.PlayerService.getPlayer(playerId);
        if (!player) {
            // Check the player is exist
            return res.status(400).json({ error: 'Player not found' });
        }
        const history = yield transactionService_1.TransactionService.getTransactionHistory(playerId);
        return res.status(200).json({ history });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.transactionHistory = transactionHistory;
