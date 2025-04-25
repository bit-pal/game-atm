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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const db_1 = require("../src/utils/db");
const authHeader = 'test_valid_token';
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize database state needed for tests  
    yield (0, db_1.query)('DELETE FROM transactions; DELETE FROM players;');
    yield (0, db_1.query)('INSERT INTO players (id, name, balance) VALUES (1, \'Player1\', 500)');
    yield (0, db_1.query)('INSERT INTO players (id, name, balance) VALUES (2, \'Player2\', 500)');
}), 10000);
describe('ATM Endpoints', () => {
    it('should deposit money to player balance', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/atm/deposit/1')
            .set('Authorization', authHeader)
            .send({ amount: 100 });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Deposit successful');
    }), 10000);
    it('should withdraw money from player balance', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/atm/withdraw/1')
            .set('Authorization', authHeader)
            .send({ amount: 50 });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Withdrawal successful');
    }), 10000);
    it('should fetch player balance', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/api/atm/balance/1')
            .set('Authorization', authHeader);
        expect(res.statusCode).toEqual(200);
    }));
    it('should fetch transaction history', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/api/atm/history/1')
            .set('Authorization', authHeader);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.history)).toBeTruthy();
    }));
    it('should transfer money between players', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/atm/transfer/1/2')
            .set('Authorization', authHeader)
            .send({ amount: 50 });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Transfer successful');
    }), 10000);
});
