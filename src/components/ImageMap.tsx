import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const ImageMap: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(true); // Initial state set to true for expanded
    const [tooltip, setTooltip] = useState<{ visible: boolean; content: string; x: number; y: number; }>({ visible: false, content: '', x: 0, y: 0 });

    const router = useRouter();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.src = '/map.svg'; // Your base64-encoded SVG here
        image.onload = () => {
            // Set the canvas size to match the image's natural size
            canvas.width = image.width;
            canvas.height = image.height;

            // Use device pixel ratio to scale the canvas
            const dpr = window.devicePixelRatio || 1;
            canvas.width = image.width * dpr;
            canvas.height = image.height * dpr;
            ctx.scale(dpr, dpr);

            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing
            ctx.drawImage(image, 0, 0, image.width, image.height);
            setMapLoaded(true);
        };
    }, []);


    useEffect(() => {
        // Set isExpanded to false after the initial render
        setIsExpanded(false);
    }, []);

    useEffect(() => {
        const sessionIsExpanded = sessionStorage.getItem('isExpanded');
        setIsExpanded(sessionIsExpanded === 'true');
    }, []);

    const handlePixelClick = (row: number, col: number): void => {
        void router.push(`/pixel?row=${row}&col=${col}`);
    };

    const toggleExpand = (e: React.MouseEvent): void => {
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

    const getRowColFromMouseEvent = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const scaleX = e.currentTarget.width / rect.width; // Determine the scale factor for X
        const scaleY = e.currentTarget.height / rect.height; // Determine the scale factor for Y

        // Adjust mouse position by the canvas position and scale
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const row = Math.floor(y / 10);
        const col = Math.floor(x / 10);

        return { row, col };
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
        if (isExpanded && mapLoaded) {
            const { row, col } = getRowColFromMouseEvent(e);
            handlePixelClick(row, col);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (isExpanded && mapLoaded) {
            const { row, col } = getRowColFromMouseEvent(e);

            // Update tooltip position to follow the mouse. Adjust as needed for offset.
            const rect = e.currentTarget.getBoundingClientRect();
            setTooltip({
                visible: true,
                content: `Block: (${row}, ${col})`,
                x: e.clientX - rect.left, // Position tooltip relative to canvas, not viewport
                y: e.clientY - rect.top
            });
        }
    };

    const handleMouseLeave = () => {
        setTooltip(prev => ({ ...prev, visible: false }));
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
            className='cursor-pointer w-full min-h-screen overflow-y-auto'
            onClick={toggleExpand}
        >
            <canvas
                className={`cursor-pointer ${isExpanded ? 'mt-[130px]' : 'absolute top-1/2 translate-y-[-40%] left-1/2 translate-x-[-50%] w-[60%] lg:w-[20%] '} transition-all duration-300`}
                ref={canvasRef}
                width={2000}
                height={2000}
                style={{ maxWidth: '100%', height: 'auto' }} // Maintain the aspect ratio and prevent scaling issues
                onClick={handleCanvasClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            />
            {tooltip.visible && canvasRef.current && (
                <div
                    style={{
                        position: 'absolute',
                        top: `${tooltip.y + canvasRef.current.offsetTop + 15}px`,
                        left: `${tooltip.x + canvasRef.current.offsetLeft + 15}px`,
                        backgroundColor: 'white',
                        padding: '5px',
                        borderRadius: '5px',
                        boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
                        zIndex: 100,
                    }}
                >
                    {tooltip.content}
                </div>
            )}

            {!isExpanded && (
                <p className="text-gray-700 absolute top-1/2 left-[50%] transform translate-x-[-100%] animate-pulse -translate-y-[-0%]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                    </svg>
                </p>
            )}

            <button className="absolute bottom-10 right-48 bg-white text-gray-900 px-4 py-2 rounded shadow" onClick={downloadMap}>
                Download Map
            </button>
        </motion.div>
    );
};

export default ImageMap;
