import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import DataLoader from './components/DataLoader';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <DataLoader />
      </ErrorBoundary>
    </div>
  );
}

export default App;
