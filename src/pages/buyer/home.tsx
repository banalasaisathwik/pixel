import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();

    const handleStep1Click = () => {
        router.push('payment');
    };

    const handleStep2Click = () => {
        router.push('selection');
    };

    const handleStep3Click = () => {
        router.push('details');
    };

    const handleStatusClick = () => {
        // Handle status button click
    };

    const handleRaiseTicketClick = () => {
        // Handle raise ticket button click
    };

    return (
        <div >
            <div className="text-center mb-4">
                <p className="text-lg font-bold text-gray-800">Welcome to the compilation of success of the past 10 years of startups in India / Startup India initiative.</p>
            </div>
            <div className="flex justify-around mb-4">
                <button onClick={handleStep1Click} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Step 1: Payment</button>
                <button onClick={handleStep2Click} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Step 2: Pixel Place Selection</button>
                <button onClick={handleStep3Click} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Step 3: Upload Website Details</button>
            </div>
            <div className="text-center mb-4">
                <p>Your image on pixel will be updated within 24 hours. You can check your status here:</p>
                <button onClick={handleStatusClick} className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none">Check Status</button>
            </div>
            <div className="text-center">
                <p>For support or to raise a ticket:</p>
                <button onClick={handleRaiseTicketClick} className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none">Raise Ticket</button>
            </div>
        </div>
    );
}
