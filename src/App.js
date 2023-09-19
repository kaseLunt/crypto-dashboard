import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import CryptoDashboard from './components/CryptoDashboard'; // Import the CryptoDashboard component

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <CryptoDashboard /> {/* Render the CryptoDashboard component */}
      </ErrorBoundary>
    </div>
  );
}

export default App;
