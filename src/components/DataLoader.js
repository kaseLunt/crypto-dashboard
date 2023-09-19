import React, { useState, useEffect } from 'react';
import { fetchCoinData } from '../utils/api'; // Import your api function
import Chart from './Chart';
import 'chart.js/auto';

export default function DataLoader() {
  const [bitcoinData, setBitcoinData] = useState(null);
  const [ethereumData, setEthereumData] = useState(null);

  useEffect(() => {
    (async () => {
      const btcData = await fetchCoinData('bitcoin', 'usd', 30); // using api.js function
      const ethData = await fetchCoinData('ethereum', 'usd', 30); // using api.js function
      setBitcoinData(btcData);
      setEthereumData(ethData);
    })();
  }, []);

  return (
    <div>
      {bitcoinData && <Chart data={bitcoinData} coinType="Bitcoin" />}
      {ethereumData && <Chart data={ethereumData} coinType="Ethereum" />}
    </div>
  );
}
