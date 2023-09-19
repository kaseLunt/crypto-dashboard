import React, { useState, useEffect } from 'react';
import { fetchCoinData } from '../utils/api'; // Assuming this utility function exists
import Chart from './Chart';

export default function DataLoader() {
  // State variables for fetched data and error handling
  const [data, setData] = useState({ prices: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCoinData('bitcoin', 'usd', 30)
      .then((response) => {
        console.log('Data:', response);
        setData(response);
      })
      .catch((fetchError) => {
        console.error('Error:', fetchError);
        setError(fetchError);
      });
  }, []);

  // Display error message if something goes wrong during data fetching
  if (error) {
    return <div>Error occurred while fetching data: {error.message}</div>;
  }

  // Check for data in the 'prices' array for conditional rendering
  return data.prices && data.prices.length > 0 ? (
    <Chart data={data.prices} />
  ) : (
    <div>Loading...</div>
  );
}
