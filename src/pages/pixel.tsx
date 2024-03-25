import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '~/utils/api';
import Image from 'next/image';
const Hello = () => {
    const [visitorsCount, setVisitorsCount] = useState(0);

    const router = useRouter();
    // Retrieve the row and col parameters from the query object
    const { row, col } = router.query;
    const rowNumber = typeof row === 'string' ? parseInt(row, 10) : undefined;

    const { data: websiteDetails, isLoading, isError } = api.details.retrive.useQuery({ row: rowNumber || 0, col: parseInt(col as string, 10) });

    const visitorsMutation = api.details.visitors.useMutation({
        onSuccess: (data) => {
            if (data.visitors !== null) {
                setVisitorsCount(data.visitors);
            }
        },
    });

    useEffect(() => {
        if (websiteDetails && websiteDetails.id) {
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
        <div className="mx-auto p-4 cursor-pointer bg-[url('/bg.avif')] bg-cover bg-center w-full min-h-screen">

            <div className="max-w-7xl mx-auto lg:p-6 mt-44 lg:mt-44 w-full">
                <div className='w-full justify-between flex flex-col lg:flex-row items-center'>
                    <div className='flex flex-col lg:flex-row gap-6  w-full justify-between'>

                        <div className='flex gap-4 lg:gap-10 h-full'>
                            <Image width={100} height={100} className='lg:w-32 lg:h-32 w-20 h-20 object-cover object-center rounded-2xl ' src={"https://play-lh.googleusercontent.com/ANae9ACVo2HMLfZ7TlHokBERSLUnEbhIw9h2VLdqWWvkVUY0YsBDv_pU9R03lv600w"} alt='' />
                            <div className='flex flex-col items-center'>
                                <h1 className='text-3xl lg:text-6xl font-sai my-2 text-white'>KelolaPro <span className='font-kumar text-yellow-600'>#2</span> </h1>
                                <p className='text-2xl hidden lg:block text-white  font-light'>Solutive Property Management App</p>

                            </div>
                           
                        </div>
                        <p className='text-2xl lg:hidden  text-white  font-light'>Solutive Property Management App</p>

                        <div className=' flex flex-col lg:flex-row  items-center gap-4'>
                            <Link href={"https://kelolapro.com/property-management-app/"} className=' lg:w-[240px] w-full justify-center text-xl flex  items-center gap-4 font-semibold rounded-md border-2 border-white text-white p-4 '>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                </svg>
                                  <p> UPVOTE (201)</p>
                              </Link>

                            <Link href={"https://kelolapro.com/property-management-app/"} className='text-xl font-semibold w-full lg:w-[200px] text-center rounded-md bg-white text-gray-900 p-4 font-sai'>Visit Website</Link>
                        </div>
                    </div>
                </div>
                <hr className='w-full mt-10 ' />
                <div className='my-10 '>
                    <h1 className='text-white font-sai text-3xl'>What is KelolaPro ?</h1>
                    <p className='py-4 text-white text-xl'>
                        Solutive Property Management App is a comprehensive solution tailored for property owners, managers, and real estate professionals. With a suite of powerful features, it streamlines various aspects of property management, enhancing efficiency and organization. Here's an expansion on its key functionalities:

                        Receipts Maker: Simplify the process of generating and managing receipts for rental payments, maintenance fees, or any other financial transactions related to property management. The app provides customizable templates, allowing users to effortlessly create professional-looking receipts on-the-go. Integration with payment gateways ensures seamless record-keeping and transparency in financial transactions.

                        Invoicing: Enable users to create and send invoices to tenants, vendors, or service providers directly from the app. With customizable invoice templates and automated reminders for overdue payments, the app helps users maintain a steady cash flow and streamline the billing process. Integration with accounting software simplifies reconciliation and ensures accurate financial reporting.

                        Bookkeeping: Centralize all financial data and transactions within the app's intuitive bookkeeping module. Users can track income, expenses, and other financial metrics in real-time, facilitating informed decision-making and budgeting. Advanced features such as categorization, tagging, and bank reconciliation streamline financial management tasks and eliminate manual data entry errors.

                        Listing Ads: Enhance property visibility and attract potential tenants or buyers by listing properties directly within the app. Users can create detailed property listings with photos, descriptions, and amenities, reaching a wider audience across various online platforms. Integration with social media and real estate portals maximizes exposure and accelerates the leasing or sales process
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Hello;
