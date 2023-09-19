// CryptoDashboard.js
import React, { useState } from 'react';
import Search from './Search';
import CryptoChart from './CryptoChart';

function CryptoDashboard() {
  const [selectedAsset, setSelectedAsset] = useState('bitcoin'); // Initial value

  const handleAssetSelected = (asset) => {
    setSelectedAsset(asset); // Update the selected asset when the user selects one
  };

  return (
    <div>
      {/* Asset Selection */}
      <Search onAssetSelected={handleAssetSelected} />

      {/* Render the chart for the selected asset */}
      <CryptoChart coinType={selectedAsset} />
    </div>
  );
}

export default CryptoDashboard;
