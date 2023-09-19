import React, { useState } from 'react';
import '../App.css';

function Search({ onAssetSelected }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAssetSelected(inputValue);
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="asset">Token: </label>
        <input
          type="text"
          id="asset"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="e.g., bitcoin, btc, usd"
        />
        <button type="submit">Show Chart</button>
      </form>
    </div>
  );
}

export default Search;
