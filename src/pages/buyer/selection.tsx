import React, { useEffect } from 'react';
import BuyMap from '../../components/BuyMap';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';

const Buy: React.FC = () => {
    const router = useRouter();

    const { data: purchasesStatus } = api.trx.purchased.useQuery();
    useEffect(() => {
        if (purchasesStatus) {
            void router.replace('details');
        }
    }, [purchasesStatus, router]);


    return (
        <div>
            <BuyMap />
        </div>
    );
};

export default Buy;
