import { useEffect } from "react";

const RazorpayButton = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.async = true;
        script.dataset.payment_button_id = "pl_NrchsC4I6ZyqpD";

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
        <form id="razorpayForm" className="flex justify-center text-center flex-col items-center gap-10 max-w-xl">
           <div className="flex flex-col ">
                <h1 className="text-4xl font-sai font-bold mb-4 text-white">Payment</h1>
                <p className="text-white mb-4 text-4xl  font-sai">Be part of this pride. Click the button below to buy.</p>

            </div>
        </form>
    );
};
export default RazorpayButton;
