// Importing required modules and components
import React, { useState, useEffect } from 'react';
import Search from './Search';
import Chart from './Chart';
import TokenSelector from './TokenSelector';
import { fetchCoinData } from '../utils/api';
import tokenMappingArray from '../data/TokenMapping.json'; // Update path as needed
import '../App.css'; // Update path as needed

/**
 * Main dashboard component for cryptocurrency data visualization.
 */
function CryptoDashboard() {
  // State variables for selected assets, fetched data, relative data, and ambiguous tokens
  const [selectedAsset1, setSelectedAsset1] = useState('bitcoin');
  const [selectedAsset2, setSelectedAsset2] = useState('tether');
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [relativeData, setRelativeData] = useState(null);
  const [ambiguousTokens, setAmbiguousTokens] = useState(null);

  // State variable to keep track of which asset's setter should be used for ambiguous tokens
  const [currentAmbiguousAssetSetter, setCurrentAmbiguousAssetSetter] =
    useState(null);

  /**
   * Generalized asset selection handler.
   * @param {string} asset - The selected asset.
   * @param {function} setSelectedAsset - Setter function for updating the state of the selected asset.
   */
  const handleAssetSelected = (asset, setSelectedAsset) => {
    const assetLowerCase = asset.toLowerCase();
    const idMatch = tokenMappingArray.find(
      (token) => token.id === assetLowerCase
    );

    if (idMatch) {
      setSelectedAsset(idMatch.id);
      setAmbiguousTokens(null);
      return;
    }

    const symbolMatches = tokenMappingArray.filter(
      (token) => token.symbol === assetLowerCase
    );

    if (symbolMatches.length === 1) {
      setSelectedAsset(symbolMatches[0].id);
      setAmbiguousTokens(null);
    } else if (symbolMatches.length > 1) {
      setAmbiguousTokens(symbolMatches);
      setCurrentAmbiguousAssetSetter(() => setSelectedAsset);
    } else {
      setSelectedAsset(null);
      setAmbiguousTokens(null);
    }
  };

  // Fetching data for selected assets whenever they change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await fetchCoinData(selectedAsset1, 'usd', 890);
        const data2 = await fetchCoinData(selectedAsset2, 'usd', 890);
        setData1(data1);
        setData2(data2);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedAsset1, selectedAsset2]);

  // Calculating relative prices for the assets whenever their data changes
  useEffect(() => {
    const calculateRelativePrice = () => {
      if (!data1 || !data2) return;

      const prices1 = data1.prices.map((item) => item[1]);
      const prices2 = data2.prices.map((item) => item[1]);

      const relativePrices = prices1.map(
        (price1, index) => price1 / prices2[index]
      );

      setRelativeData({
        ...data1,
        prices: data1.prices.map((item, index) => [
          item[0],
          relativePrices[index],
        ]),
      });
    };

    calculateRelativePrice();
  }, [data1, data2]);

  return (
    <div className="container">
      <Search
        label="Select First Asset"
        onAssetSelected={(asset) =>
          handleAssetSelected(asset, setSelectedAsset1)
        }
      />
      <Search
        label="Select Second Asset"
        onAssetSelected={(asset) =>
          handleAssetSelected(asset, setSelectedAsset2)
        }
      />
      {ambiguousTokens ? (
        <TokenSelector
          tokens={ambiguousTokens}
          onSelect={(id) => {
            if (typeof currentAmbiguousAssetSetter === 'function') {
              currentAmbiguousAssetSetter(id);
            }
            setAmbiguousTokens(null);
          }}
        />
      ) : null}
      {relativeData && (
        <Chart
          data={relativeData}
          coinType={`${selectedAsset1}/${selectedAsset2}`}
        />
      )}
    </div>
  );
}

// Exporting the component for external use
export default CryptoDashboard;
