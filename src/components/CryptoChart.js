import React, { useState, useEffect } from 'react';
import { fetchCoinData } from '../utils/api';
import Chart from './Chart';
import 'chart.js/auto';
import '../App.css'; // Update the path based on your directory

export default function CryptoChart({ coinType }) {
  const [coinData, setCoinData] = useState(null);
  const [prevCoinType, setPrevCoinType] = useState(coinType);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const data = await fetchCoinData(coinType.toLowerCase(), 'usd', 1989);
        if (data && data.prices.length > 0) {
          setCoinData(data);
          setPrevCoinType(coinType);
        }
      } catch (e) {
        setError(e);
      }
    })();
  }, [coinType]);

  return (
    <div className="crypto-chart">
      {error && (
        <div style={{ color: 'red', fontSize: '12px' }}>Asset not found</div>
      )}
      {coinData && <Chart data={coinData} coinType={prevCoinType} />}
    </div>
  );
}
