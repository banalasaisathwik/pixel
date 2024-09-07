import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";

const MobileimageMap: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean | null>(null);
    const [tooltip, setTooltip] = useState<{ visible: boolean; content: string; x: number; y: number; }>({ visible: false, content: '', x: 0, y: 0 });

    const router = useRouter();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.src = '/map.svg';
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            setMapLoaded(true);

            // Draw grid overlay of 10x10 blocks in blue
            const blockSize = 10; // Size of each block
            const gridColor = 'rgba(169, 169, 169, 0.07)'; // Semi-transparent blue
            for (let x = 0; x < canvas.width; x += blockSize) {
                for (let y = 0; y < canvas.height; y += blockSize) {
                    ctx.fillStyle = gridColor;
                    ctx.fillRect(x, y, blockSize - 3, blockSize - 3); // Draw blue blocks
                }
            }
        };
    }, []);

    useEffect(() => {
        const sessionIsExpanded = sessionStorage.getItem('isExpanded');
        setIsExpanded(sessionIsExpanded === 'true' ? true : false);
    }, []);


    const downloadMap = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'map1.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (isExpanded && mapLoaded) {
            const rect = e.currentTarget.getBoundingClientRect();
            const scaleX = e.currentTarget.width / rect.width;   // Determine the scale factor for X
            const scaleY = e.currentTarget.height / rect.height; // Determine the scale factor for Y

            // Adjust mouse position by the canvas position and scale
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            const row = Math.floor(y / 10);
            const col = Math.floor(x / 10);

            // Update tooltip position to follow the mouse. Adjust as needed for offset.
            // Here, we're using the unscaled mouse positions for simplicity.
            setTooltip({
                visible: true,
                content: `Pixel: (${row}, ${col}) - Click here for more details`,
                x: e.clientX - rect.left, // Position tooltip relative to canvas, not viewport
                y: e.clientY - rect.top
            });
        }
    };
    const handleMouseLeave = () => {
        setTooltip(prev => ({ ...prev, visible: false }));
    };

    return (
        <div className='cursor-pointer md:hidden flex justify-center items-center w-full min-h-screen overflow-y-auto'>
            <canvas
                className='cursor-pointer w-full h-full object-contain transition-all duration-300'
                ref={canvasRef}
                width={2000}
                height={2000}
                onClick={() => {
                    void router.push(`/pixel?row=0&col=0`);
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            />
            {tooltip.visible && canvasRef.current && (
                <div>
                    {tooltip.content}
                </div>
            )}
            {true && (
                <p className="text-gray-700 absolute top-1/2 left-[50%] transform translate-x-[-100%] animate-pulse -translate-y-[-0%]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                    </svg>
                </p>
            )}
            <button className="absolute bottom-10 right-10 bg-white text-gray-900 px-4 py-2 rounded shadow" onClick={downloadMap}>
                Download Map
            </button>
        </div>
    );
};

export default MobileimageMap;