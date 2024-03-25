"use client"
import React, { useState } from 'react';
import ImageMap from '../components/ImageMap';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { motion } from "framer-motion"
import Image from 'next/image';

const Home: React.FC = () => {
  
  const router = useRouter();


  return (
    <div className=' bg-no-repeat bg-[#181818] bg-center min-h-screen w-full flex flex-col justify-center items-center'>

      
        <ImageMap />
    
    </div>
  );
};

export default Home;
