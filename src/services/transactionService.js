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
exports.TransactionService = void 0;
const db_1 = require("../utils/db");
class TransactionService {
    /**
     * Logs a transaction for a player, recording the type and amount.
     *
     * @param {number} playerId - The unique ID of the player initiating the transaction.
     * @param {string} type - The type of transaction (e.g., 'deposit', 'withdraw', 'transfer').
     * @param {number} amount - The amount involved in the transaction.
     * @param {number} [targetPlayerId] - Optional: The ID of the target player in case of a transfer.
     * @returns {Promise<void>} - A promise that resolves when the transaction is logged.
     */
    static logTransaction(playerId, type, amount, targetPlayerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.query)('INSERT INTO transactions (player_id, type, amount, target_player_id, date) VALUES ($1, $2, $3, $4, NOW())', [playerId, type, amount, targetPlayerId || null]);
        });
    }
    /**
     * Retrieves the transaction history for a specific player.
     *
     * @param {number} playerId - The unique ID of the player whose transaction history is requested.
     * @returns {Promise<Transaction[]>} - A promise that resolves to an array of transactions related to the player.
     */
    static getTransactionHistory(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, db_1.query)('SELECT * FROM transactions WHERE player_id = $1 OR target_player_id = $1 ORDER BY date DESC', [playerId]);
            return result.rows;
        });
    }
}
exports.TransactionService = TransactionService;
