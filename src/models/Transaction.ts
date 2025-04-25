export interface Transaction {
  id: number;
  playerId: number;
  type: string;
  amount: number;
  targetPlayerId?: number;
  date: Date;
}
