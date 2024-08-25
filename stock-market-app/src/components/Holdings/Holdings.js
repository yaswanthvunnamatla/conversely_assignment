import React from 'react';
import './Holdings.css';

const Holdings = ({ holdings }) => {
    return (
        <div className="holdings">
            <h2>My Holdings</h2>
            <table className="holdings-table">
                <thead>
                    <tr>
                        <th>Stock</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {holdings.length > 0 ? (
                        holdings.map((holding) => (
                            <tr key={holding.stock}>
                                <td>{holding.stock}</td>
                                <td>{holding.quantity}</td>
                                <td>${holding.price.toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No holdings available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Holdings;


