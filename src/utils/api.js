// Importing Axios library for HTTP requests
import axios from 'axios';

/**
 * Fetch historical data for a given cryptocurrency from the CoinGecko API
 * @param {string} id - The id of the cryptocurrency
 * @param {string} vs_currency - The target currency for market data
 * @param {number} from - The start date in UNIX timestamp
 * @param {number} to - The end date in UNIX timestamp
 * @returns {Promise<Object>} - A promise resolving to the fetched data
 */

// Updated fetchCoinData function
export const fetchCoinData = async (coinId, currency, days) => {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Optionally handle the error here if needed
    throw error;
  }
};
