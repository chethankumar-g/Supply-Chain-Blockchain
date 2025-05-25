import React, { useState } from 'react';
import { getProduct } from '../utils/api';

const ProductProvenance = () => {
    const [batchId, setBatchId] = useState('');
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');

    const handleFetch = async () => {
        if (!batchId) return;
        const res = await getProduct(batchId);
        if (res.error) setError(res.error);
        else setProduct(res);
    };

    return (
        <div>
            <h2>Product Provenance</h2>
            <input
                type="text"
                placeholder="Batch ID"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
            />
            <button onClick={handleFetch}>Fetch Provenance</button>
            {error && <p>{error}</p>}
            {product && (
                <div>
                    <p><strong>Batch ID:</strong> {product.batchId}</p>
                    <p><strong>Producer:</strong> {product.producer}</p>
                    <p><strong>IPFS Hash:</strong> {product.ipfsHash}</p>
                    <p><strong>Verified:</strong> {product.isVerified ? 'Yes' : 'No'}</p>
                    <p><strong>Flagged:</strong> {product.isFlagged ? 'Yes' : 'No'}</p>
                </div>
            )}
        </div>
    );
};

export default ProductProvenance;