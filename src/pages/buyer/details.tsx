import React from 'react';
import WebsiteForm from '~/components/WebsiteDetails';
import { api } from '~/utils/api';


const Buy: React.FC = () => {

    const {data:status} = api.details.detailsStatus.useQuery();

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[url('/bg.avif')] bg-cover bg-center">
            {status?.success && "you details are already given , you can update your details here"}
        <div className='mt-[200px]  w-full mb-[100px]'>
           <WebsiteForm/>
        </div>
        </div>
    );
};

export default Buy;

