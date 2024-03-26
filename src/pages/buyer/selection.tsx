import React, { useEffect } from 'react';
import BuyMap from '../../components/BuyMap';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import Loading from '~/components/Loading';

const Buy: React.FC = () => {
    const router = useRouter();

    const { data: purchasesStatus,isLoading } = api.trx.purchased.useQuery();
    useEffect(() => {
        if (purchasesStatus) {
            void router.replace('details');
        }
    }, [purchasesStatus, router]);
    
    if (isLoading ) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div>
            <BuyMap />
        </div>
    );
};

export default Buy;
