import React, { useState } from 'react';
import { useButtonStore } from '~/store/button';
import { useImageStore } from '~/store/logo';

const Header = () => {
    const { clicked, setClicked } = useButtonStore();
    const { setImage ,image} = useImageStore(); 
 
    const handleButtonClick = () => {
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
        <div className='flex justify-end items-center sticky shadow-lg bg-black text-white px-10 py-4'>
            <ul className='flex space-x-10 text-xl items-center cursor-pointer'>
                <li className='hover:underline underline-offset-8 transition-all duration-300'>MAP</li>
                <li className='hover:underline underline-offset-8 transition-all duration-300'>ABOUT</li>
                <li className='hover:underline underline-offset-8 transition-all duration-300'>INVITE</li>
                <li
                    onClick={handleButtonClick}
                    className='border px-10 py-2 hover:bg-white hover:text-black transition-all duration-300'>
                    {image ? "PAYMENT" : clicked ? "UPLOAD LOGO" : "BUY"}
                </li>
            </ul>
        </div>
    );
};

export default Header;
