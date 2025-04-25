import request from 'supertest';  
import app from '../src/app';  
import { query } from '../src/utils/db'; 

const authHeader = 'test_valid_token';

beforeEach(async () => {  
  // Initialize database state needed for tests  
  await query('DELETE FROM transactions; DELETE FROM players;');  
  await query('INSERT INTO players (id, name, balance) VALUES (1, \'Player1\', 500)');  
  await query('INSERT INTO players (id, name, balance) VALUES (2, \'Player2\', 500)');  
}, 10000);

describe('ATM Endpoints', () => {  
  it('should deposit money to player balance', async () => {  
    const res = await request(app)  
      .post('/api/atm/deposit/1')  
      .set('Authorization', authHeader)
      .send({ amount: 100 });  
    
    expect(res.statusCode).toEqual(200);  
    expect(res.body.message).toEqual('Deposit successful');  
  }, 10000);  

  it('should withdraw money from player balance', async () => {  
    const res = await request(app)  
      .post('/api/atm/withdraw/1')  
      .set('Authorization', authHeader)
      .send({ amount: 50 });  
    
    expect(res.statusCode).toEqual(200);  
    expect(res.body.message).toEqual('Withdrawal successful');  
  }, 10000);  

  it('should fetch player balance', async () => {  
    const res = await request(app)  
      .get('/api/atm/balance/1')
      .set('Authorization', authHeader);  
    
    expect(res.statusCode).toEqual(200);  
  });  

  it('should fetch transaction history', async () => {  
    const res = await request(app)  
      .get('/api/atm/history/1')
      .set('Authorization', authHeader);  
    
    expect(res.statusCode).toEqual(200);  
    expect(Array.isArray(res.body.history)).toBeTruthy();  
  });  

  it('should transfer money between players', async () => {  
    const res = await request(app)  
      .post('/api/atm/transfer/1/2')  
      .set('Authorization', authHeader)  
      .send({ amount: 50 });  
    
    expect(res.statusCode).toEqual(200);  
    expect(res.body.message).toEqual('Transfer successful');  
  }, 10000);
});  