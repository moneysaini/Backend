import apiClient from './interceptors/axiosInterceptor';
import { ENDPOINTS } from './constants/endpoints';

// Example API call using the Axios instance with interceptors
export async function getBalanceSheetData(): Promise<any> {
  try {
    const response = await apiClient.get(ENDPOINTS.BALANCE_SHEET);
    return response.data;
  } catch (error) {
    const typedError = error as Error;   
    console.error('Error fetching balance sheet data:', typedError.message);
    throw error;
  }
}
