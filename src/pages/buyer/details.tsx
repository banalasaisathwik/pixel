import React from 'react';
import WebsiteForm from '~/components/WebsiteDetails';
import { api } from '~/utils/api';


const Buy: React.FC = () => {

    const {data:status} = api.details.detailsStatus.useQuery();

    return (
        <div>
            {status?.success && "you details are already given , you can update your details here"}
        <div>
           <WebsiteForm/>
        </div>
        </div>
    );
};

export default Buy;

