import React from 'react';
import '../App.css';
export default function TokenSelector({ tokens, onSelect }) {
  return (
    <div>
      <p>Multiple tokens found with the same symbol. Please select one:</p>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">--Please choose an option--</option>
        {tokens.map((token, index) => (
          <option key={index} value={token.id}>
            {token.name} ({token.id})
          </option>
        ))}
      </select>
    </div>
  );
}
