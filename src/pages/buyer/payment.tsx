import React, { useEffect, useState } from 'react';

const App = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const script = document.createElement("script");
        const form = document.getElementById("donateForm");

        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.async = true;
        script.dataset.payment_button_id = "pl_NimT82xAM6oODa";

        if (form) {
            form.appendChild(script);
        }

        return () => {
            // Cleanup the script when the component unmounts
            if (form) {
                form.removeChild(script);
            }
        };
    }, [mounted]);

    return (
        <div className="flex justify-center items-center h-screen">
            <form id="donateForm" className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">payment</h1>
                <p className="text-gray-600 mb-4"> part of the this pride . Click the button below to buy.</p>
                {mounted && <div className="text-center" id="pl_NimT82xAM6oODa"></div>}
            </form>
        </div>
    );
};

export default App;
