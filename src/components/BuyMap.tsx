import React, { useEffect, useRef, useState } from 'react';

const BuyPage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [selectedPixels, setSelectedPixels] = useState<{ row: number; col: number }[]>([]);

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

    const soldPixels = [
        { row: 10, col: 20 },
        { row: 15, col: 25 },
        // Add more sold pixel coordinates as needed
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !mapLoaded) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw map
        const image = new Image();
        image.src = '/map.svg';
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            // Draw sold pixels
            ctx.fillStyle = 'red';
            soldPixels.forEach(pixel => {
                ctx.fillRect(pixel.col * 10, pixel.row * 10, 10, 10); // Adjust pixel size to 10x10
            });

            // Draw selected pixels
            ctx.fillStyle = 'blue';
            selectedPixels.forEach(pixel => {
                ctx.fillRect(pixel.col * 10, pixel.row * 10, 10, 10); // Adjust pixel size to 10x10
            });
        };
    }, [selectedPixels, mapLoaded]);

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!mapLoaded) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const row = Math.floor(y / 10); // Each cell is 10 pixels in height
        const col = Math.floor(x / 10); // Each cell is 10 pixels in width

        // Check if the clicked pixel is already selected
        const index = selectedPixels.findIndex(pixel => pixel.row === row && pixel.col === col);
        if (index !== -1) {
            // Deselect the pixel by removing it from the selectedPixels array
            setSelectedPixels(prevPixels => prevPixels.filter((_, idx) => idx !== index));
        } else {
            // Select the pixel by adding it to the selectedPixels array
            setSelectedPixels(prevPixels => [...prevPixels, { row, col }]);
        }
    };

    return (
        <div>
            <h1>Buy Pixels</h1>
            <canvas
                ref={canvasRef}
                width={2000}
                height={2000}
                onClick={handleCanvasClick}
                style={{ border: '1px solid black', cursor: 'pointer' }}
            />
        </div>
    );
};

export default BuyPage;
