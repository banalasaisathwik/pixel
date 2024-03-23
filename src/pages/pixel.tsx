import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '~/utils/api';

const Hello = () => {
    const [visitorsCount, setVisitorsCount] = useState(0);

    const router = useRouter();
    // Retrieve the row and col parameters from the query object
    const { row, col } = router.query;
    const rowNumber = typeof row === 'string' ? parseInt(row, 10) : undefined; // Convert row to number

    const { data: websiteDetails, isLoading, isError } = api.details.retrive.useQuery({ row: rowNumber || 0, col: parseInt(col as string, 10) });

    const visitorsMutation = api.details.visitors.useMutation({
        onSuccess: (data) => {
            if (data.visitors !== null) { // Check if the value is not null
                setVisitorsCount(data.visitors); // Set the visitors count
            }
        },
    });

    useEffect(() => {
        if (websiteDetails && websiteDetails.id) {
            // Trigger the mutation to increment the visitors count
            visitorsMutation.mutate({ websiteId: websiteDetails.id });
        }
    }, [websiteDetails]);


    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-lg font-semibold">Loading...</div>
        </div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen text-red-500">
            <div className="text-lg font-semibold">Error fetching website details</div>
        </div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Location Details</h1>
                <p className="text-md text-gray-600">Row: {row}, Col: {col}</p>
                <p className="text-md text-gray-600">visits: {visitorsCount}</p>

            </div>
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Website Details:</h2>
                <p className="text-md text-gray-700"><span className="font-semibold">Website Name:</span> {websiteDetails?.websiteName}</p>
                <p className="text-md text-gray-700"><span className="font-semibold">Tagline:</span> {websiteDetails?.tagline}</p>
                <p className="text-md text-gray-700"><span className="font-semibold">Description:</span> {websiteDetails?.description}</p>
                <p className="text-md text-gray-700"><span className="font-semibold">Website URL:</span> <a href={websiteDetails?.websiteUrl} className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">{websiteDetails?.websiteUrl}</a></p>
                {/* You can display more details as needed */}
            </div>
        </div>
    );
}

export default Hello;
