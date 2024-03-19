import React from 'react';
import ImageMap from '../components/ImageMap';
import { useRouter } from 'next/router';

const Home: React.FC = () => {

  const router = useRouter();
  return (
    <div>
      <div>
        <h1>Home</h1>
        <button onClick={()=>{
          router.push('/buy')
        }}> buy for yourself</button>
      </div>
      
      <ImageMap />
    </div>
  );
};

export default Home;
