# Blockchain-Based Supply Chain Management System

## Overview
This project is a blockchain-based supply chain management system focused on ethical sourcing. It aims to enhance transparency, traceability, and accountability in sourcing practices, particularly in industries with a high risk of unethical practices, such as food, diamonds, and fashion.

## Features
- **Verified Participants**: Only verified producers, certifiers, transporters, and retailers can onboard, utilizing KYC processes and digital signatures to establish unique and trusted blockchain identities.
- **Sourcing Certifications**: Producers can upload sourcing certifications (e.g., Fair Trade, Organic) as digital documents stored on IPFS, with the hash linked immutably in the blockchain.
- **Batch-Level Tracking**: Each product unit or batch is assigned a unique batch ID and QR code, allowing for tracking of every event (production, transport, sale) via blockchain transactions.
- **Smart Contract Logic**: Automatically flags products as “unverified” if:
  - The source is not digitally certified.
  - The chain of custody is incomplete or broken.
  - Third-party attestation is missing.
- **Third-Party Validation**: Auditors or NGOs can validate sources, shifting a product’s status from "Unverified" to "Verified."
- **Consumer Interface**: Users can scan QR codes to view full product provenance and sourcing verification status, indicated by color codes:
  - ✅ Green = Fully verified
  - ⚠️ Yellow = Missing some certifications
  - ❌ Red = Unverified source or broken chain
- **Admin Dashboard**: Compliance officers can view statistics on unverified products, frequent sourcing gaps, and participant compliance scores.

## Technologies Used
- **Blockchain**: Ethereum (using Ganache for local development)
- **Smart Contracts**: Solidity
- **Document Storage**: IPFS
- **Frontend**: React.js with QR code scanner
- **Backend**: Flask

## Setup Instructions
1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd blockchain-supplychain-app
   ```

2. **Backend Setup**:
   - Navigate to the `backend` directory.
   - Install dependencies:
     ```
     pip install -r requirements.txt
     ```
   - Run the Flask application:
     ```
     python app.py
     ```

3. **Smart Contracts**:
   - Navigate to the `contracts` directory.
   - Compile and deploy contracts using Truffle:
     ```
     truffle migrate --network development
     ```

4. **Frontend Setup**:
   - Navigate to the `frontend` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Start the React application:
     ```
     npm start
     ```

## Steps to Connect to MetaMask Wallet
1. Install the MetaMask browser extension and create a wallet if you haven't already.
2. In the `frontend/src/utils/web3.js` file, ensure you have the Web3.js library imported.
3. Use the following code snippet to connect to MetaMask:
   ```javascript
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
   ```
4. Call this connection function when your application initializes, typically in the `componentDidMount` lifecycle method of your main component.

## Conclusion
This blockchain-based supply chain management system is designed to promote ethical sourcing practices by leveraging blockchain technology for enhanced accountability and transparency. By ensuring that only verified participants can engage in the supply chain and providing consumers with easy access to product provenance, the system aims to mitigate the risks associated with unethical sourcing practices.