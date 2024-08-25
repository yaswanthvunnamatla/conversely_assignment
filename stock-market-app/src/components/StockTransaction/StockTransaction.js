import React, { useState } from 'react';
import './StockTransaction.css';

const StockTransaction = ({ onTransaction }) => {
    const [stock, setStock] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('Buy');

    const handleSubmit = (e) => {
        e.preventDefault();
        onTransaction({
            stock,
            quantity: parseInt(quantity, 10),
            price: parseFloat(price),
            type
        });
        setStock('');
        setQuantity('');
        setPrice('');
    };

    return (
        <div className="StockTransaction">
            <h2>Stock Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Stock:</label>
                    <input
                        type="text"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="Buy">Buy</option>
                        <option value="Sell">Sell</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default StockTransaction;
