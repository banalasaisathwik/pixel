import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Loading from '~/components/Loading';
import RazorpayButton from '~/components/RazorpayButton';
import { api } from '~/utils/api';

const App = () => {
    const router = useRouter();

    const { data: paymentStatus, isLoading } = api.trx.payment.useQuery();
    const { data: q } = api.trx.quantity.useQuery();


    const quantity = q?.quantity ?? 0



    useEffect(() => {

        if (paymentStatus) {
            void router.replace('details');
        }
    }, [paymentStatus, router]);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.async = true;
        script.dataset.payment_button_id = "pl_NrchsC4I6ZyqpD";
        script.setAttribute('data-prefill.amount.10_by_10_size_pixels_tsest', quantity.toString());

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

    if (isLoading || !mounted) {
        return (
            <div className="flex justify-center items-center w-full min-h-screen  flex-col  bg-cover bg-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="w-full  min-h-screen flex flex-col justify-center items-center  bg-cover bg-center">
        
            <RazorpayButton />
        </div>
    );
};


export default App;
