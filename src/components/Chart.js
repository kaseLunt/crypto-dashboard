import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Chart({ data, coinType }) {
  const transformedData = {
    labels: data.prices.map((item) => new Date(item[0]).toLocaleDateString()),
    datasets: [
      {
        label: `${coinType} Price`,
        borderColor: 'rgb(75, 192, 192)',
        data: data.prices.map((item) => item[1]),
      },
    ],
  };

  return (
    <div>
      <h2>{coinType} Chart</h2>
      <Line data={transformedData} />
    </div>
  );
}
