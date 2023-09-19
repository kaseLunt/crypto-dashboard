// CryptoChart.js
import React, { useState, useEffect } from 'react';
import { fetchCoinData } from '../utils/api'; // Import your api function
import Chart from './Chart';
import 'chart.js/auto';

export default function CryptoChart({ coinType }) {
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchCoinData(coinType.toLowerCase(), 'usd', 30); // using api.js function
      setCoinData(data);
    })();
  }, [coinType]);

  return <div>{coinData && <Chart data={coinData} coinType={coinType} />}</div>;
}
