import React from 'react';
import Trending from '../../components/Trending';

const TrendingList: React.FC = () => {
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Trending List</h1>
            <Trending />
        </div>
    );
};

export default TrendingList;
