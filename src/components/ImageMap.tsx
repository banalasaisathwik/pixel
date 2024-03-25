import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";

const ImageMap: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false); // Explicitly specify boolean type for mapLoaded
    const [isExpanded, setIsExpanded] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const storedValue = window.sessionStorage.getItem('isExpanded');
            return storedValue ? JSON.parse(storedValue) as boolean : false;
        } else {
            return false;
        }
    });

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
        sessionStorage.setItem('isExpanded', JSON.stringify(isExpanded));
    }, [isExpanded]);

    const handlePixelClick = (row: number, col: number): void => { // Explicitly specify void return type
        void router.push(`/pixel?row=${row}&col=${col}`);
    };

    const toggleExpand = (): void => { // Explicitly specify void return type
        setIsExpanded(prevState => !prevState); // Toggle isExpanded state
    };

    const variants = {
        normal: {
            y: 0,
            scale: 1,
        },
        expanded: {
            y: -50,
            scale: 1.1,
        },
    };

    return (
        <motion.div
            initial={false}
            animate={isExpanded ? 'expanded' : 'normal'}
            variants={variants}
            className='cursor-pointer bg-[url("/bg.avif")] bg-cover bg-center w-full min-h-screen'
            onClick={toggleExpand}
        >
            <canvas
                className={`cursor-pointer ${isExpanded ? 'mt-[200px]' : 'absolute top-1/2  translate-y-[-40%] left-1/2 translate-x-[-50%] w-[20%] '}  transition-all duration-300 `}
                ref={canvasRef}
                width={2000}
                height={2000}
                onClick={(e) => {
                    if (isExpanded && mapLoaded) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const row = Math.floor(y / 10); // Each cell is 10 pixels in height
                        const col = Math.floor(x / 10); // Each cell is 10 pixels in width
                        handlePixelClick(row, col);
                    }
                }}
            />
        </motion.div>
    );
};

export default ImageMap;
