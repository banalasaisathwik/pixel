import { useEffect } from "react";

const RazorpayButton = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.async = true;
        script.dataset.payment_button_id = "pl_NohSKLIPsGsVAD";

        const form = document.getElementById("razorpayForm");
        if (form) {
            form.appendChild(script);
        } else {
            console.error("Form element with id 'razorpayForm' not found");
        }

        return () => {
            if (form) {
                form.removeChild(script);
            }
        };
    }, []);

    return (
        <form id="razorpayForm" className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">Payment</h1>
            <p className="text-gray-600 mb-4">Be part of this pride. Click the button below to buy.</p>
        </form>
    );
};
export default RazorpayButton;
