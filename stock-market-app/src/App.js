import React from 'react';
import DataDisplay from './components/DataDisplay/DataDisplay';
import './App.css'
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Real Time Stock Market Application</h1>
            </header>
            <DataDisplay />
        </div>
    );
}
export default App;
