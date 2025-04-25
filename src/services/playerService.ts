import { query } from '../utils/db';
import { Player } from '../models/Player';
import { TransactionService } from './transactionService';

export class PlayerService {
  /**
   * Retrieves a player's details by their ID.
   *
   * @param {number} playerId - The unique ID of the player to retrieve.
   * @returns {Promise<Player | null>} - A promise that resolves to the player object if found, or null if not.
   */
  static async getPlayer(playerId: number): Promise<Player | null> {
    const result = await query('SELECT * FROM players WHERE id = $1', [
      playerId,
    ]);
    return result.rows[0] as Player;
  }

  /**
   * Retrieves the balance of a player by their ID.
   *
   * @param {number} playerId - The unique ID of the player whose balance is requested.
   * @returns {Promise<number>} - A promise that resolves to the player's balance.
   */
  static async getPlayerBalance(playerId: number): Promise<number> {
    const result = await query('SELECT balance FROM players WHERE id = $1', [
      playerId,
    ]);
    return result.rows[0].balance as number;
  }

  /**
   * Updates a player's balance by adding a specified amount.
   *
   * @param {number} playerId - The unique ID of the player whose balance will be updated.
   * @param {number} amount - The amount to adjust the player's balance by. Positive to increase, negative to decrease.
   * @returns {Promise<void>} - A promise that resolves when the balance is updated.
   */
  static async updatePlayerBalance(
    playerId: number,
    amount: number
  ): Promise<void> {
    await query(
      'UPDATE players SET balance = balance + $1 WHERE id = $2 RETURNING balance',
      [amount, playerId]
    );
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
  static async transferMoney(
    fromPlayerId: number,
    toPlayerId: number,
    amount: number
  ): Promise<void> {
    await query('BEGIN');

    try {
      await this.updatePlayerBalance(fromPlayerId, -amount);
      await this.updatePlayerBalance(toPlayerId, amount);

      await TransactionService.logTransaction(
        fromPlayerId,
        'transfer',
        amount,
        toPlayerId
      );

      await query('COMMIT');
    } catch (error) {
      await query('ROLLBACK');
      throw error;
    }
  }
}
