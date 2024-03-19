import Script from 'next/script';

const RazorpayButton = () => {
    return (
        <form id="rzp_payment_form">
            <button id="pl_NimT82xAM6oODa">Buy Pixels</button>
            <Script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_NimT82xAM6oODa" async />
        </form>
    );
};

export default RazorpayButton;
