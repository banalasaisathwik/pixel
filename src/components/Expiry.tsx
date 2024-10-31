import React, { useEffect, useState } from 'react';
import { api } from '~/utils/api';

const ExpiryTimeDisplay = () => {
    const { data: expiryTime, isLoading, isError } = api.trx.expiryTime.useQuery();
    const [formattedExpiryTime, setFormattedExpiryTime] = useState('');

    useEffect(() => {
        if (expiryTime) {
            const expiryDate = new Date(expiryTime);
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            setFormattedExpiryTime(expiryDate.toLocaleString('en-US', options));
        }
    }, [expiryTime]);

    if (isLoading) {
        return <div>Loading...</div>; // Loading state
    }

    if (isError) {
        return <div>Error fetching expiry time.</div>; // Error state
    }

    return (
        <div>
            <h3>complete before this time to complete the purchase</h3>
            <p>{formattedExpiryTime || 'No expiry time set'}</p>
        </div>
    );
};

export default ExpiryTimeDisplay;
