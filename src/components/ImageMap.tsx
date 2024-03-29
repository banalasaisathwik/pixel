import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";

const ImageMap: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean | null>(null);

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
        };
    }, []);

    useEffect(() => {
        const sessionIsExpanded = sessionStorage.getItem('isExpanded');
        setIsExpanded(sessionIsExpanded === 'true' ? true : false);
    }, []);

    const handlePixelClick = (row: number, col: number): void => {
        void router.push(`/pixel?row=${row}&col=${col}`);
    };

    const toggleExpand = (): void => {
        sessionStorage.setItem('isExpanded', 'true')
        setIsExpanded(prevState => !prevState);
    };

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

    const variants = {
        normal: {
            y: 0,
            scale: 0.98,
        },
        expanded: {
            y: -50,
            scale: 1,
        },
    };

    return (
        <motion.div
            initial={false}
            animate={isExpanded !== null ? (isExpanded ? 'expanded' : 'normal') : undefined}
            variants={variants}
            className='cursor-pointer bg-[url("/bg.avif")] bg-cover bg-center w-full min-h-screen overflow-y-auto'
            onClick={toggleExpand}
        >

            <canvas
                className={`cursor-pointer ${isExpanded ? 'mt-[200px]' : 'absolute top-1/2 translate-y-[-40%] left-1/2 translate-x-[-50%] w-[60%] lg:w-[20%] '}  transition-all duration-300`}
                ref={canvasRef}
                width={2000}
                height={2000}
                onClick={(e) => {
                    if (isExpanded && mapLoaded) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const row = Math.floor(y / 10);
                        const col = Math.floor(x / 10);
                        handlePixelClick(row, col);
                    }
                }}
            />
            {!isExpanded && (
                <p className="text-gray-700 absolute top-1/2 left-[50%] transform translate-x-[-100%] animate-pulse -translate-y-[-0%]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                    </svg>

                </p>
            )}

            <button className="absolute bottom-10 right-10 bg-white text-gray-900 px-4 py-2 rounded shadow" onClick={downloadMap}>
                Download Map
            </button>
        </motion.div>
    );
};

export default ImageMap;
