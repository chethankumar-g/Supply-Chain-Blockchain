import Web3 from 'web3';

let web3;

const connectToMetaMask = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
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

const getWeb3 = () => {
    return web3;
};

export { connectToMetaMask, getWeb3 };