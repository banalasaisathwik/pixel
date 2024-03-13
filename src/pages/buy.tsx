import React from 'react';
import RazorpayButton from '~/components/RazorpayButton';

import BuyMap from '../components/BuyMap';

const Buy: React.FC = () => {
    return (
        <div>
            <div className="App">
                <RazorpayButton />
            </div>
            <h1>Buy</h1>
            <BuyMap />
        </div>
    );
};

export default Buy;

