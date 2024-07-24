import React, { useEffect, useState } from 'react';
import ImageMap from '../components/ImageMap';
import MobileimageMap from '~/components/mobileImageMap';
import Loading from '~/components/Loading';

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const detectMobile = () => {
      const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(mobile);
    };

    // Use a timeout to ensure the detection runs after the initial render
    const timer = setTimeout(detectMobile, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Render nothing or a loading state until the mobile detection is complete
  if (isMobile === null) {
    return <div> 
      <Loading/>
    </div>;
  }

  if (isMobile) {
    return (
      <div className='bg-center min-h-screen w-full flex flex-col justify-center items-center'>
        <MobileimageMap/>
      </div>
    );
  }

  return (
    <div className='bg-center min-h-screen w-full flex flex-col justify-center items-center'>
      <ImageMap />
    </div>
  );
};

export default Home;
