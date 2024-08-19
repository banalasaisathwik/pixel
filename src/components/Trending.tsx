// Trending.tsx
import React from 'react';
import { api } from '~/utils/api';
import Loading from './Loading';
import Image from 'next/image';


const Trending = () => {
    const { data: topTrending, isLoading, isError } = api.details.Trending.useQuery();

    if (isLoading) {
        return (
            <div className='bg-center min-h-screen w-full flex flex-col justify-center items-center'>
                <Loading />
            </div>
        );
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center  bg-cover bg-center">
            <div className="container mx-auto mt-8">
                <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16">
                    <div className="bg-gray-100 py-2 px-4">
                        <h2 className="text-xl font-semibold text-gray-800">Top visited websites 📈</h2>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {topTrending.map((user, index) => (
                            <li key={user.id} className="flex items-center py-4 px-6">
                                <span className="text-gray-700 text-lg font-medium mr-4">{index + 1}.</span>
                                <Image height={30} width={30} className="w-12 h-12 rounded-full object-cover mr-4" src={user.imageUrl} alt="User avatar" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-gray-800">{user.websiteName}</h3>
                                    <p className="text-gray-600 text-base">{user.visitors} Visitors</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Trending;
