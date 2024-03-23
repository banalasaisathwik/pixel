
import { useRouter } from "next/router";
import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { api } from "~/utils/api";

const Support: React.FC = () => {

    const router = useRouter(); 
    const {data:status} = api.support.uploadStatus.useQuery();
    const handleRaiseTicketClick = () => {
        router.push('ticket');
    };
    return (
        <div>
            <div className="text-center mb-4">
                <p>Your image on pixel will be updated within 24 hours. You can check your status here:</p>
                <p className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none">
                    {status ? (
                        <>
                            Uploaded <FaCheckCircle className="ml-1" /> {/* Render the icon next to "Uploaded" */}
                        </>
                    ) : (
                        'Not yet uploaded'
                    )}
                </p>
            </div>
            <div className="text-center">
                <p>For support or to raise a ticket:</p>
                <button onClick={handleRaiseTicketClick} className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none">Raise Ticket</button>
            </div>
        </div>
    );
};

export default Support;
