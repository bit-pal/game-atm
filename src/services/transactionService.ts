import { query } from '../utils/db';
import { Transaction } from '../models/Transaction';

export class TransactionService {
  /**
   * Logs a transaction for a player, recording the type and amount.
   *
   * @param {number} playerId - The unique ID of the player initiating the transaction.
   * @param {string} type - The type of transaction (e.g., 'deposit', 'withdraw', 'transfer').
   * @param {number} amount - The amount involved in the transaction.
   * @param {number} [targetPlayerId] - Optional: The ID of the target player in case of a transfer.
   * @returns {Promise<void>} - A promise that resolves when the transaction is logged.
   */
  static async logTransaction(
    playerId: number,
    type: string,
    amount: number,
    targetPlayerId?: number
  ): Promise<void> {
    await query(
      'INSERT INTO transactions (player_id, type, amount, target_player_id, date) VALUES ($1, $2, $3, $4, NOW())',
      [playerId, type, amount, targetPlayerId || null]
    );
  }

  /**
   * Retrieves the transaction history for a specific player.
   *
   * @param {number} playerId - The unique ID of the player whose transaction history is requested.
   * @returns {Promise<Transaction[]>} - A promise that resolves to an array of transactions related to the player.
   */
  static async getTransactionHistory(playerId: number): Promise<Transaction[]> {
    const result = await query(
      'SELECT * FROM transactions WHERE player_id = $1 OR target_player_id = $1 ORDER BY date DESC',
      [playerId]
    );

    return result.rows as Transaction[];
  }
}
