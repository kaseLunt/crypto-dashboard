// Search.js
import React, { useState } from 'react';

function Search({ onAssetSelected }) {
  const [inputValue, setInputValue] = useState(''); // State to store user input

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update the input value as the user types
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    onAssetSelected(inputValue); // Pass the user input to the parent component
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="asset">Enter an Asset ID:</label>
        <input
          type="text"
          id="asset"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="e.g., bitcoin"
        />
        <button type="submit">Show Chart</button>
      </form>
    </div>
  );
}

export default Search;
