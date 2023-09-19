import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Chart = ({ data }) => {
  // Implementing an error state to catch issues within this component
  const [hasError, setHasError] = React.useState(false);

  try {
    // Transforming data to fit charting library expectations
    const labels = data.map((point) => new Date(point[0]).toLocaleDateString());
    const dataSet = data.map((point) => point[1]);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Bitcoin Price in USD',
          data: dataSet,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        },
      ],
    };

    console.log('Transformed Data:', chartData);

    if (!chartData.labels || !chartData.datasets) {
      throw new Error("Transformed data is missing 'labels' or 'datasets'");
    }

    // Rendering the Line chart
    return <Line data={chartData} />;
  } catch (error) {
    console.error('An error occurred in the Chart component:', error);
    setHasError(true);
    return <div>Error occurred while rendering the chart: {error.message}</div>;
  }
};

export default Chart;
