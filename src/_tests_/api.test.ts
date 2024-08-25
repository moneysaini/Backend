import { getBalanceSheetData } from '../api';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getBalanceSheetData', () => {
  it('should return data on successful API call', async () => {
    const mockData = { data: 'mocked balance sheet data' };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });
    const data = await getBalanceSheetData();
    expect(data).toEqual(mockData);
  });

  it('should throw an error on failed API call', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API error'));
    await expect(getBalanceSheetData()).rejects.toThrow('API error');
  });
});
