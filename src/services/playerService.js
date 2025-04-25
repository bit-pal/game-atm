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
exports.PlayerService = void 0;
const db_1 = require("../utils/db");
const transactionService_1 = require("./transactionService");
class PlayerService {
    /**
     * Retrieves a player's details by their ID.
     *
     * @param {number} playerId - The unique ID of the player to retrieve.
     * @returns {Promise<Player | null>} - A promise that resolves to the player object if found, or null if not.
     */
    static getPlayer(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, db_1.query)('SELECT * FROM players WHERE id = $1', [
                playerId,
            ]);
            return result.rows[0];
        });
    }
    /**
     * Retrieves the balance of a player by their ID.
     *
     * @param {number} playerId - The unique ID of the player whose balance is requested.
     * @returns {Promise<number>} - A promise that resolves to the player's balance.
     */
    static getPlayerBalance(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, db_1.query)('SELECT balance FROM players WHERE id = $1', [
                playerId,
            ]);
            return result.rows[0].balance;
        });
    }
    /**
     * Updates a player's balance by adding a specified amount.
     *
     * @param {number} playerId - The unique ID of the player whose balance will be updated.
     * @param {number} amount - The amount to adjust the player's balance by. Positive to increase, negative to decrease.
     * @returns {Promise<void>} - A promise that resolves when the balance is updated.
     */
    static updatePlayerBalance(playerId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.query)('UPDATE players SET balance = balance + $1 WHERE id = $2 RETURNING balance', [amount, playerId]);
        });
    }
    /**
     * Transfers money between two players.
     *
     * @param {number} fromPlayerId - The unique ID of the player sending the money.
     * @param {number} toPlayerId - The unique ID of the player receiving the money.
     * @param {number} amount - The amount to transfer between players.
     * @returns {Promise<void>} - A promise that resolves when the transaction is complete.
     * @throws {Error} If the transaction fails, it rolls back and throws an error.
     */
    static transferMoney(fromPlayerId, toPlayerId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.query)('BEGIN');
            try {
                yield this.updatePlayerBalance(fromPlayerId, -amount);
                yield this.updatePlayerBalance(toPlayerId, amount);
                yield transactionService_1.TransactionService.logTransaction(fromPlayerId, 'transfer', amount, toPlayerId);
                yield (0, db_1.query)('COMMIT');
            }
            catch (error) {
                yield (0, db_1.query)('ROLLBACK');
                throw error;
            }
        });
    }
}
exports.PlayerService = PlayerService;
