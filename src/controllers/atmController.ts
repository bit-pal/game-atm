import { Request, Response } from 'express';
import { PlayerService } from '../services/playerService';
import { TransactionService } from '../services/transactionService';

/**
 * Handles withdrawal of funds for a player.
 *
 * @param {Request} req - The request object, containing player ID and withdrawal amount.
 * @param {Response} res - The response object used to send back the anticipated HTTP responses.
 * @returns {Promise<any>} - A promise that resolves when the operation is complete.
 */
export const withdraw = async (req: Request, res: Response): Promise<any> => {
  const playerId = parseInt(req.params.playerId);
  const { amount } = req.body;

  try {
    if (Number(amount) <= 0) {
      // Check the amount is greater than 0
      return res.status(400).json({ error: 'Amount must be greater than 0' });
    }

    const player = await PlayerService.getPlayer(playerId);
    if (!player) {
      // Check the player is exist
      return res.status(400).json({ error: 'Player not found' });
    }

    const balance = await PlayerService.getPlayerBalance(playerId);
    if (balance < amount) {
      // Check the balance is greater than amount
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    await PlayerService.updatePlayerBalance(playerId, -amount);
    await TransactionService.logTransaction(playerId, 'withdraw', amount);

    return res
      .status(200)
      .json({ message: 'Withdrawal successful', newBalance: balance - amount });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Handles deposit of funds for a player.
 *
 * @param {Request} req - The request object, containing player ID and deposit amount.
 * @param {Response} res - The response object used to send back the anticipated HTTP responses.
 * @returns {Promise<any>} - A promise that resolves when the operation is complete.
 */
export const deposit = async (req: Request, res: Response): Promise<any> => {
  const playerId = parseInt(req.params.playerId);
  const { amount } = req.body;

  try {
    if (Number(amount) <= 0) {
      // Check the amount is greater than 0
      return res.status(400).json({ error: 'Amount must be greater than 0' });
    }

    const player = await PlayerService.getPlayer(playerId);
    if (!player) {
      // Check the player is exist
      return res.status(400).json({ error: 'Player not found' });
    }

    await PlayerService.updatePlayerBalance(playerId, amount);
    await TransactionService.logTransaction(playerId, 'deposit', amount);

    const newBalance = await PlayerService.getPlayerBalance(playerId);

    return res.status(200).json({ message: 'Deposit successful', newBalance });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Handles the transfer of funds between two players.
 *
 * @param {Request} req - The request object, containing IDs of both players and the transfer amount.
 * @param {Response} res - The response object used to send back the anticipated HTTP responses.
 * @returns {Promise<any>} - A promise that resolves when the operation is complete.
 */
export const transfer = async (req: Request, res: Response): Promise<any> => {
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

    const fromPlayer = await PlayerService.getPlayer(fromPlayerId);
    if (!fromPlayer) {
      // Check the player is exist
      return res.status(400).json({ error: 'From Player not found' });
    }

    const toPlayer = await PlayerService.getPlayer(toPlayerId);
    if (!toPlayer) {
      // Check the player is exist
      return res.status(400).json({ error: 'To Player not found' });
    }

    const balance = await PlayerService.getPlayerBalance(fromPlayerId);
    if (balance < amount) {
      // Check the balance is greater than amount
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    await PlayerService.transferMoney(fromPlayerId, toPlayerId, amount);
    return res.status(200).json({ message: 'Transfer successful' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves the balance for a specified player.
 *
 * @param {Request} req - The request object, containing the player ID.
 * @param {Response} res - The response object used to send back the anticipated HTTP responses.
 * @returns {Promise<any>} - A promise that resolves with the player's balance.
 */
export const checkBalance = async (
  req: Request,
  res: Response
): Promise<any> => {
  const playerId = parseInt(req.params.playerId);

  try {
    const player = await PlayerService.getPlayer(playerId);
    if (!player) {
      // Check the player is exist
      return res.status(400).json({ error: 'Player not found' });
    }

    const balance = await PlayerService.getPlayerBalance(playerId);
    return res.status(200).json({ balance });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves the transaction history for a specified player.
 *
 * @param {Request} req - The request object, containing the player ID.
 * @param {Response} res - The response object used to send back the anticipated HTTP responses.
 * @returns {Promise<any>} - A promise that resolves with the player's transaction history.
 */
export const transactionHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  const playerId = parseInt(req.params.playerId);

  try {
    const player = await PlayerService.getPlayer(playerId);
    if (!player) {
      // Check the player is exist
      return res.status(400).json({ error: 'Player not found' });
    }

    const history = await TransactionService.getTransactionHistory(playerId);
    return res.status(200).json({ history });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
