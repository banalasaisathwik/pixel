import React from 'react';
import { api } from '~/utils/api';
import Loading from './Loading';
import Image from 'next/image';

const Trending = () => {
    const { data: topTrending, isLoading, isError } = api.details.Trending.useQuery();

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Trending</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topTrending.map(item => (
                    <Card key={item.id} trends={item} />
                ))}
            </div>
        </div>
    );
};

interface trendingType{
    id: string,
    imageUrl: string;
    websiteName: string,
    tagline: string;
    visitors: number | null;
}
const Card: React.FC<{ trends: trendingType }> = ({ trends  }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <Image src={trends.imageUrl} alt={'image'} height={30} width={30}/>
            <h2 className="text-lg font-semibold">{trends.websiteName}</h2>
            <p className="mb-2">Tagline: {trends.tagline}</p>
            <p className="text-gray-600">Visits: {trends.visitors}</p>
        </div>
    );
};

export default Trending;
