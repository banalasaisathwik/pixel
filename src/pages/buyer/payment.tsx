import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { api } from '~/utils/api';

const App = () => {
    const router = useRouter();

    const { data: paymentStatus, isLoading } = api.trx.payment.useQuery();

    useEffect(() => {
        if (paymentStatus) {
            void router.replace('selection');
        }
    }, [paymentStatus, router]);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const script = document.createElement("script");
        const form = document.getElementById("donateForm");

        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.async = true;
        script.dataset.payment_button_id = "pl_NohSKLIPsGsVAD";

        if (form) {
            form.appendChild(script);
        }

        return () => {
            // Cleanup the script when the component unmounts
            if (form) {
                form.removeChild(script);
            }
        };
    }, []);

    if (isLoading || !mounted) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div>loading ...</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[url('/bg.avif')] bg-cover bg-center">
            <form id="donateForm" className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Payment</h1>
                <p className="text-gray-600 mb-4">Be part of this pride. Click the button below to buy.</p>
                {mounted && <button className="text-center" id="pl_NohSKLIPsGsVAD"/>}
            </form>
        </div>
    );
};

export default App;
