import React from 'react';
import Loading from '~/components/Loading';
import WebsiteForm from '~/components/WebsiteDetails';
import { api } from '~/utils/api';


const Buy: React.FC = () => {

    const { data: status,isLoading } = api.details.detailsStatus.useQuery();
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[url('/bg.avif')] bg-cover bg-center">
            <div className="text-center mb-8 mt-12  w-full max-w-2xl">
                <p className="text-3xl mb-2 mt-24 text-white ">
                    {status?.success && "your details are already given, you can update your details here"}
                </p>
                <div className='mt-8 w-full '> 
                    <WebsiteForm success={status?.success ?? false} />
                </div>
            </div>
        </div>

    );
};

export default Buy;

