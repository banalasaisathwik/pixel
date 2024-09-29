import React, { useEffect, useState } from 'react';
import ImageMap from '../components/ImageMap';
import MobileimageMap from '~/components/mobileImageMap';
import Loading from '~/components/Loading';
import isMobile from 'is-mobile';
import Cursor from '~/components/Cursor';


const Home: React.FC = () => {
  const [IsMobileDevice, setIsMobileDevice] = useState<boolean | null>(null);

  useEffect(() => {
      const mobile = isMobile();
      setIsMobileDevice(mobile);
    
  }, []);

  // Render nothing or a loading state until the mobile detection is complete
  if (isMobile === null) {
    return <div> 
      <Loading/>
    </div>;
  }

  if (IsMobileDevice) {
    return (
      <div className='bg-center min-h-screen w-full flex flex-col justify-center items-center'>
        <MobileimageMap/>
      </div>
    );
  }

  return (
    <div className='bg-center min-h-screen w-full flex flex-col justify-center items-center'>
      <Cursor/>
      <ImageMap />
    </div>
  );
};

export default Home;
