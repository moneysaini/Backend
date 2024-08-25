import request from 'supertest';
import express from 'express';
import { getBalanceSheetData } from '../api';
import { ROUTES } from '../constants/routes';
import { errorHandler } from '../middleware/errorHandler';

jest.mock('../api');
const mockedGetBalanceSheetData = getBalanceSheetData as jest.MockedFunction<typeof getBalanceSheetData>;

const app = express();
app.get(ROUTES.BALANCE_SHEET, async (req, res, next) => {
  try {
    const data = await getBalanceSheetData();
    res.json(data);
  } catch (error) {
    next(error);
  }
});
app.use(errorHandler);

describe('API Routes', () => {
  it('should return balance sheet data', async () => {
    const mockData = { data: 'mocked balance sheet data' };
    mockedGetBalanceSheetData.mockResolvedValueOnce(mockData);
    const response = await request(app).get(ROUTES.BALANCE_SHEET);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  it('should handle errors correctly', async () => {
    mockedGetBalanceSheetData.mockRejectedValueOnce(new Error('API error'));
    const response = await request(app).get(ROUTES.BALANCE_SHEET);
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('An unexpected error occurred');
  });
});
