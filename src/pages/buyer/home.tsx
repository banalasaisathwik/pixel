import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { FaCheck } from "react-icons/fa"; // Ensure you've imported the FaCheck icon
import Support from "~/components/support";

export default function Page() {
    const router = useRouter();
    const { data: paymentStatus, isLoading } = api.trx.payment.useQuery();
    const { data: purchasesStatus } = api.trx.purchased.useQuery();
    const isPaymentComplete = Boolean(paymentStatus); // Adjust based on your data structure
    const hasMadePurchase = Boolean(purchasesStatus); // Assuming this is a boolean, adjust as necessary
    const {data: UploadStatus } = api.support.uploadStatus.useQuery();
    const handleStep1Click = () => {
        if (!isPaymentComplete) {
            router.push('payment');
        }
    };

    const handleStep2Click = () => {
        if (isPaymentComplete && !hasMadePurchase) {
            router.push('selection');
        }
    };

    const handleStep3Click = () => {
        if (isPaymentComplete) {
            router.push('details');
        }
    };



    return (
        <div>
            <div className="text-center mb-4">
                <p className="text-lg font-bold text-gray-800">Welcome to the compilation of success of the past 10 years of startups in India / Startup India initiative.</p>
            </div>
            <div className="flex justify-around mb-4">
                <button
                    onClick={handleStep1Click}
                    disabled={isLoading || isPaymentComplete}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-md ${isLoading || isPaymentComplete ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600 focus:outline-none'}`}
                    title={!isLoading && isPaymentComplete ? "Payment is complete" : "Click to make payment"}
                >
                    Step 1: Payment {isPaymentComplete && <FaCheck className="inline" />}
                </button>
                <button
                    onClick={handleStep2Click}
                    disabled={!isPaymentComplete || hasMadePurchase}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-md ${!isPaymentComplete || hasMadePurchase ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600 focus:outline-none'}`}
                    title={!isPaymentComplete ? "First complete the payment" : hasMadePurchase ? "Purchase already made" : ""}
                >
                    Step 2: Pixel Place Selection {hasMadePurchase && <FaCheck className="inline" />}
                </button>
                <button
                    onClick={handleStep3Click}
                    disabled={!isPaymentComplete}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-md ${!isPaymentComplete ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600 focus:outline-none'}`}
                    title={!isPaymentComplete ? "First complete the payment" : ""}
                >
                    Step 3: Upload/update Website Details
                </button>
            </div>
           <Support/>
        </div>
    );
}
