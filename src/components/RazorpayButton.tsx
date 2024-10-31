import { useEffect } from "react";
import { api } from "~/utils/api";

const RazorpayButton = () => {
    const { data: q } = api.trx.quantity.useQuery();


    const quantity = q?.quantity ?? 0

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.async = true;
        script.dataset.payment_button_id = "pl_NrchsC4I6ZyqpD";
        script.setAttribute('data-prefill.amount.10_by_10_size_pixels_tsest', quantity.toString());
        console.log(quantity.toString()+quantity);
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
                <p className="text-green-500 mb-4 text-xl  font-sai">You selected {quantity} spaces that cost {15000 * quantity} rupess only</p>
            </div>
        </form>
    );
};
export default RazorpayButton;
