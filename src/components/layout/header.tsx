import React, { useState } from 'react';
import { useButtonStore } from '~/store/button';
import { useImageStore } from '~/store/logo';

const Header = () => {
    const { clicked, setClicked } = useButtonStore();
    const { setImage, image } = useImageStore();

    const handleButtonClick = () => {
        setClicked(false)
        if (clicked) {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*'; // Restrict to image files
            fileInput.onchange = (e) => {
                // Handle file selection
                const file = e.target?.files[0];
                setImage(file)
            };
            fileInput.click();
        } else {
            setClicked(true);
        }
    };

    return (
        <div className='flex w-full justify-end items-center sticky shadow-lg bg-black text-white px-10 py-4'>
            <ul className='lg:flex hidden space-x-10 text-xl items-center cursor-pointer'>
                <li className='hover:underline underline-offset-8 transition-all duration-300'>MAP</li>
                <li className='hover:underline underline-offset-8 transition-all duration-300'>ABOUT</li>
                <li className='hover:underline underline-offset-8 transition-all duration-300'>INVITE</li>
                <li
                    onClick={handleButtonClick}
                    className='border px-10 py-2 hover:bg-white hover:text-black transition-all duration-300'>
                    {image ? "PAYMENT" : clicked ? "UPLOAD LOGO" : "BUY"}
                </li>
            </ul>
            <svg data-slot="icon" fill="none" className='w-10 h-10' strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
            </svg>
        </div>
    );
};

export default Header;
