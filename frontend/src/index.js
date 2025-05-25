import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Web3 from 'web3';

const connectMetaMask = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected to MetaMask');
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        console.error('MetaMask not detected');
    }
};

const renderApp = async () => {
    await connectMetaMask();
    ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();