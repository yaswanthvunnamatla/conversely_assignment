import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import StockTransaction from '../StockTransaction/StockTransaction';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import Holdings from '../Holdings/Holdings';
import './DataDisplay.css';

const DataDisplay = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState('AAPL');
    const [stockData, setStockData] = useState([]);
    const [holdings, setHoldings] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStockOptions = async () => {
            setStocks(['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NFLX', 'FB', 'BABA', 'NVDA', 'AMD']);
        };

        fetchStockOptions();
    }, []);

    useEffect(() => {
        const fetchStockData = async () => {
            setLoading(true);
            setError(null);
            try {
                const API_KEY = '8U2uLm0TXCN0chC99juWmwurUR7NkR23';
                const url = `https://api.polygon.io/v2/aggs/ticker/${selectedStock}/range/1/day/2023-01-01/2023-12-31?adjusted=true&sort=asc&apiKey=${API_KEY}`;
                const response = await axios.get(url);
                setStockData(response.data.results);
            } catch (error) {
                setError('Error fetching stock data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchStockData();
    }, [selectedStock]);

    const handleTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
    
        setHoldings(prevHoldings => {
            const index = prevHoldings.findIndex(h => h.stock === transaction.stock);
    
            if (transaction.type === 'Buy') {
                if (index !== -1) {
                    const updatedHoldings = [...prevHoldings];
                    updatedHoldings[index].quantity += transaction.quantity;
                    updatedHoldings[index].price = transaction.price;
                    return updatedHoldings;
                } else {
                    return [...prevHoldings, {
                        stock: transaction.stock,
                        quantity: transaction.quantity,
                        price: transaction.price
                    }];
                }
            } else if (transaction.type === 'Sell') {
                if (index !== -1) {
                    const updatedHoldings = [...prevHoldings];
                    updatedHoldings[index].quantity -= transaction.quantity;
                    if (updatedHoldings[index].quantity <= 0) {
                        updatedHoldings.splice(index, 1); 
                    }
                    return updatedHoldings;
                } else {
                    
                    alert(`Cannot sell ${transaction.stock} - not in holdings`);
                    return prevHoldings;
                }
            }
    
            return prevHoldings;
        });
    };

    const dates = stockData.map(item => new Date(item.t).toLocaleDateString());
    const closingPrices = stockData.map(item => item.c);

    return (
        <div className="DataDisplay">
            <div className="navbar">
                <div className="navbar-left">
                    <h2>Stock Market Data</h2>
                </div>
                <div className="navbar-right">
                    <select
                        value={selectedStock}
                        onChange={(e) => setSelectedStock(e.target.value)}
                        className="stock-dropdown"
                    >
                        {stocks.map(stock => (
                            <option key={stock} value={stock}>{stock}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="graph-container">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && stockData.length > 0 && (
                    <Plot
                        data={[
                            {
                                x: dates,
                                y: closingPrices,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: 'blue' },
                            }
                        ]}
                        layout={{
                            width: 700,
                            height: 400,
                            title: `Stock Prices for ${selectedStock}`,
                            xaxis: { title: 'Date' },
                            yaxis: { title: 'Price' },
                        }}
                    />
                )}
            </div>
            <div className="transaction-container">
                <StockTransaction onTransaction={handleTransaction} />
            </div>
            <div className="holdings-container">
                <Holdings holdings={holdings} />
            </div>
            <div className="transaction-history-container">
                <TransactionHistory transactions={transactions} />
            </div>
        </div>
    );
};

export default DataDisplay;
