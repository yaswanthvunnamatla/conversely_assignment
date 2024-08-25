import React from 'react';
import './TransactionHistory.css';

const TransactionHistory = ({ transactions }) => {
    return (
        <div className="transaction-history">
            <h2>Transaction History</h2>
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Stock</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{new Date().toLocaleDateString()}</td> 
                                <td>{transaction.stock}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.quantity}</td>
                                <td>${transaction.price.toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No transactions available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
