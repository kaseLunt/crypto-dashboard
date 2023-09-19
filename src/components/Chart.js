// Importing required libraries and modules
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

/**
 * The Chart component that renders a line chart for a given cryptocurrency.
 * @param {Object} props - The component props.
 * @param {Object} props.data - The chart data.
 * @param {string} props.coinType - The type of coin to display.
 */
export default function Chart({ data, coinType }) {
  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Transforming the data for use with Chart.js
  const transformedData = {
    // Converting UNIX timestamps to localized date strings for labels
    labels: data.prices.map((item) => new Date(item[0]).toLocaleDateString()),
    datasets: [
      {
        label: `${capitalizeFirstLetter(coinType)} Price`,
        borderColor: 'rgb(75, 192, 192)',
        // Extracting price data for the line chart
        data: data.prices.map((item) => item[1]),
      },
    ],
  };

  return (
    <div>
      {/* Rendering the coin type and the line chart */}
      <h2>{capitalizeFirstLetter(coinType)}</h2>
      <Line data={transformedData} />
    </div>
  );
}
