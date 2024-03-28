import Link from 'next/link';
import React from 'react';
import { FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer>
      <div className="text-base text-gray-500 text-center mb-4">Copyright © 2024 Bharat startup sankalan</div>
      <div className="flex flex-col justify-center w-full text-center lg:flex-row gap-4">
        <Link href="/terms" className="text-gray-500 text-base hover:text-gray-400">Terms & Conditions</Link>
        <Link href="/privacy" className="text-gray-500 text-base hover:text-gray-400">Privacy Policy</Link>
        <Link href="mailto:bharatstartupsankalan@gmail.com" className="text-gray-500 text-base hover:text-gray-400">Contact Us</Link>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        {/* Instagram icon with link */}
        <a href="YOUR_INSTAGRAM_LINK_HERE" target="_blank" rel="noopener noreferrer">
          <FiInstagram className="text-gray-500 text-base hover:text-gray-400" />
        </a>
        {/* Twitter icon with link */}
        <a href="YOUR_TWITTER_LINK_HERE" target="_blank" rel="noopener noreferrer">
          <FiTwitter className="text-gray-500 text-base hover:text-gray-400" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
