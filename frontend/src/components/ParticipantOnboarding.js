import React, { useState } from 'react';
import { onboardParticipant } from '../utils/api';

const ParticipantOnboarding = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    const handleOnboard = async () => {
        if (!name || !role) {
            setMessage('All fields are required.');
            return;
        }
        if (!window.ethereum) {
            setMessage('MetaMask not detected');
            return;
        }
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        const res = await onboardParticipant(address, name, role);
        if (res.error) setMessage(res.error);
        else setMessage('Participant onboarded and KYC verified!');
    };

    return (
        <div>
            <h2>Participant Onboarding</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Role (Producer, Certifier, etc.)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            />
            <button onClick={handleOnboard}>Onboard Participant</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ParticipantOnboarding;