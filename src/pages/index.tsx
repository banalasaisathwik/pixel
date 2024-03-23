import React from 'react';
import ImageMap from '../components/ImageMap';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';

const Home: React.FC = () => {

  const router = useRouter();
  return (
    <div>
      <div>
        <h1>Showcasing Bharath's Last 10 Years of Transformation</h1>
        <p>Click anywhere on the map for more information.</p>
        <button onClick={()=>{
          router.push('/buyer/home')
        }}> buy place for your company</button>
      </div>
      
      <ImageMap />
    </div>
  );
};

export default Home;
