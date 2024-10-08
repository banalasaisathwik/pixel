import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { FaCheck } from "react-icons/fa";
import Support from "~/components/support";
import Loading from "~/components/Loading";

export default function Page() {
    const router = useRouter();
    const { data: paymentStatus, isLoading: paymentLoading } = api.trx.payment.useQuery();
    const { data: purchasesStatus, isLoading: purchaseLoading } = api.trx.purchased.useQuery();
    const isPaymentComplete = Boolean(paymentStatus);
    const hasMadePurchase = Boolean(purchasesStatus);
    const isDataLoading = paymentLoading || purchaseLoading;

    const handleStep1Click = () => {
        if (!isPaymentComplete) {
            void router.push('payment');
        }
    };

    const handleStep2Click = () => {
        if (isPaymentComplete && !hasMadePurchase) {
            void router.push('selection');
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
        <section className="w-full min-h-screen flex flex-col justify-center items-center  bg-cover bg-center p-8">
            <div className="text-center my-20 max-w-2xl">

                <p className="lg:text-3xl text-lg mb-2 mt-20 lg:mt-32 text-center text-white font-style: italic">

                    Congratulations on showcasing your company logo in this sankalan (compilation).

                    To avoid overlapping and complexity, the payment is the first step.                </p>


            </div>
            <div className="flex flex-col items-center justify-center gap-8">
                <button
                    onClick={handleStep1Click}
                    disabled={isDataLoading || isPaymentComplete}
                    className={`p-4 text-lg bg-black text-white rounded-md ${isDataLoading || isPaymentComplete ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-800 focus:outline-none'}`}
                    title={!isDataLoading && isPaymentComplete ? "Payment is complete" : "Click to make payment"}
                >
                    Step 1: Payment {isPaymentComplete && <FaCheck className="inline" />}
                </button>
                <button
                    onClick={handleStep2Click}
                    disabled={!isPaymentComplete || hasMadePurchase}
                    className={`p-4 text-lg bg-black text-white rounded-md ${!isPaymentComplete || hasMadePurchase ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-800 focus:outline-none'}`}
                    title={!isPaymentComplete ? "First complete the payment" : hasMadePurchase ? "Already Selection completed" : ""}
                >
                    Step 2: Space Position Selection {hasMadePurchase && <FaCheck className="inline" />}
                </button>
                <button
                    onClick={handleStep3Click}
                    disabled={!isPaymentComplete}
                    className={`p-4 text-lg bg-black text-white rounded-md ${!isPaymentComplete ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-800 focus:outline-none'}`}
                    title={!isPaymentComplete ? "First complete the payment" : ""}
                >
                    Step 3: Upload/update Website Details
                </button>
            </div>
            <Support paymentStatus={paymentStatus} />
        </section>
    );
}
