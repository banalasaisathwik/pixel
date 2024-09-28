import Link from 'next/link';
import React from 'react';
import { FiInstagram, FiTwitter } from 'react-icons/fi';
import Faq from './faq';

const Footer = () => {
  return (
    <footer className=" w-full  py-4 px-4  z-10 flex flex-col justify-center items-center lg:flex-col lg:justify-content-center align-items-center ">
      <div className=' w-full'>
        <Faq/>
      </div>
      <div>
      <div className="flex flex-col justify-center w-full text-center lg:flex-row gap-4">
        <Link href="/terms" className="text-gray-500 text-lg hover:text-gray-400">Terms & Conditions</Link>
        <Link href="/privacy" className="text-gray-500 text-lg hover:text-gray-400">Privacy Policy</Link>
          <Link href="mailto:pixelpreneur.in@gmail.com" className="text-gray-500 text-lg hover:text-gray-400">Contact Us</Link>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        {/* Instagram icon with link */}
          <a href="https://www.instagram.com/pixelpreneur_bss/" target="_blank" rel="noopener noreferrer">
          <FiInstagram size={24} className="text-gray-500 text-base hover:text-gray-400" />
        </a>
        {/* Twitter icon with link */}
          <a href="https://twitter.com/startupsankalan" target="_blank" rel="noopener noreferrer">
          <FiTwitter size={24} className="text-gray-500 text-base hover:text-gray-400" />
        </a>
      </div>
      </div>
      <div className="text-lg text-gray-500 text-center mt-4">Copyright © 2024 pixelpreneur</div>

    </footer>
  );
};

export default Footer;
