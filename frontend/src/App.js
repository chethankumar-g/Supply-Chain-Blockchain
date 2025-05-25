import React, { useEffect } from 'react';
import Web3 from 'web3';
import QRScanner from './components/QRScanner';
import ProductProvenance from './components/ProductProvenance';
import VerificationStatus from './components/VerificationStatus';
import AdminDashboard from './components/AdminDashboard';
import ParticipantOnboarding from './components/ParticipantOnboarding';

const App = () => {
    useEffect(() => {
        const connectToMetaMask = async () => {
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

        connectToMetaMask();
    }, []);

    return (
        <div>
            <h1>Blockchain Supply Chain Management</h1>
            <ParticipantOnboarding />
            <QRScanner />
            <ProductProvenance />
            <VerificationStatus />
            <AdminDashboard />
        </div>
    );
};

export default App;