import React, { useState } from 'react';
import axios from 'axios';

const EthereumBalance = () => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [error, setError] = useState('');

    const getBalance = async () => {
        try {
            const response = await axios.get(`/api/balance/${address}`);
            setBalance(response.data.balance);
            setError('');
        } catch (error) {
            setError('Invalid Ethereum Account Address');
            setBalance('');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-blue-100 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Check Ethereum Account Balance</h2>
            <div className="flex items-center mb-4">
                <input 
                    className="flex-1 px-4 py-2 mr-2 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-50"
                    type="text" 
                    placeholder="Enter Ethereum address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                />
                <button 
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    onClick={getBalance}
                >
                    Get Balance
                </button>
            </div>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {balance && <p className="text-green-600 mb-4">Balance: {balance} ETH</p>}
        </div>
    );
};

export default EthereumBalance;