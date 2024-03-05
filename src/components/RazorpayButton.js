// RazorpayButton.js
import Script from 'next/script';
import React from 'react';

const RazorpayButton = () => {
    return (
        <form>
            <button id="pl_NimDFWp4BIkKcg">buy pixels</button>
            <Script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_NimT82xAM6oODa" async/> 
        </form>
    );
};

export default RazorpayButton;
