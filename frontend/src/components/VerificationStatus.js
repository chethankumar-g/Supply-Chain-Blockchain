import React from 'react';

const VerificationStatus = ({ status }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'verified':
                return 'green';
            case 'partially_verified':
                return 'yellow';
            case 'unverified':
                return 'red';
            default:
                return 'gray';
        }
    };

    return (
        <div style={{ color: getStatusColor(status), fontWeight: 'bold' }}>
            {status === 'verified' && '✅ Fully Verified'}
            {status === 'partially_verified' && '⚠️ Missing Some Certifications'}
            {status === 'unverified' && '❌ Unverified Source or Broken Chain'}
            {status === 'unknown' && '❓ Status Unknown'}
        </div>
    );
};

export default VerificationStatus;