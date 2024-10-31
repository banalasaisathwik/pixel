import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { FaCheck } from "react-icons/fa";
import Support from "~/components/support";
import Loading from "~/components/Loading";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();
    const { data: paymentStatus, isLoading: paymentLoading } = api.trx.payment.useQuery();
    const { data: purchasesStatus, isLoading: purchaseLoading } = api.trx.purchased.useQuery();
    const cleanExp = api.trx.statusChangeAfterExp.useMutation();

    useEffect(() => {
        cleanExp.mutate();
    },[]);

    const isPaymentComplete = Boolean(paymentStatus);
    const hasMadePurchase = Boolean(purchasesStatus);
    const isDataLoading = paymentLoading || purchaseLoading;

    const handleStep1Click = () => {
        void router.push('selection');
    };

    const handleStep2Click = () => {
        if (!isPaymentComplete) {
            void router.push('payment');
        }
    };

    const handleStep3Click = () => {
        if (isPaymentComplete) {
            void router.push('details');
        }
    };

    if (isDataLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <section className="w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-center p-8">
            <div className="text-center my-20 max-w-2xl">
                <p className="lg:text-3xl text-lg mb-2 mt-20 lg:mt-32 text-center text-white font-style: italic">
                    Congratulations on showcasing your company logo in this compilation.
                    To avoid overlapping and complexity, the payment is the first step.
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-8">
                <button
                    onClick={handleStep1Click}
                    disabled={hasMadePurchase}
                    className={`p-4 text-lg bg-black text-white rounded-md ${hasMadePurchase ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-800 focus:outline-none'}`}
                >
                    Step 1: Space Position Selection {hasMadePurchase && <FaCheck className="inline" />}
                </button>
                <p className="text-center text-gray-300 text-lg max-w-[40%]">
                    Click on the map to select the 10x10 pixel space.
                </p>

                <button
                    onClick={handleStep2Click}
                    disabled={!hasMadePurchase || isPaymentComplete}
                    className={`p-4 text-lg bg-black text-white rounded-md ${!hasMadePurchase || isPaymentComplete ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-800 focus:outline-none'}`}
                >
                    Step 2: Payment {isPaymentComplete && <FaCheck className="inline" />}
                </button>
                <p className="text-center text-gray-300 text-lg max-w-[40%]">
                    Make payment within 5 minutes after selecting blocks, or the transaction will expire.
                </p>

                <button
                    onClick={handleStep3Click}
                    disabled={!isPaymentComplete}
                    className={`p-4 text-lg bg-black text-white rounded-md ${!isPaymentComplete ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-800 focus:outline-none'}`}
                    title={!isPaymentComplete ? "First complete the payment" : ""}
                >
                    Last Step: Upload/Update Website Details
                </button>
                <p className="text-center text-gray-300 text-lg max-w-[40%]">
                    Provide your ad details here.
                </p>
            </div>
            <Support paymentStatus={paymentStatus} />
        </section>
    );
}
