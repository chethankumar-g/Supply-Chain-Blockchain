import React, { useState } from 'react';
import { getProduct } from '../utils/api';

const QRScanner = () => {
    const [qrCodeData, setQrCodeData] = useState('');
    const [product, setProduct] = useState(null);

    const handleScan = async () => {
        if (!qrCodeData) return;
        const res = await getProduct(qrCodeData);
        setProduct(res);
    };

    return (
        <div>
            <h2>Scan QR Code</h2>
            <input
                type="text"
                value={qrCodeData}
                onChange={(e) => setQrCodeData(e.target.value)}
                placeholder="Enter Batch ID from QR"
            />
            <button onClick={handleScan}>Scan</button>
            {product && (
                <div>
                    <h3>Product Information</h3>
                    <pre>{JSON.stringify(product, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default QRScanner;