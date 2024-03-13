import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const ImageMap: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

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

    const router = useRouter();

    const handlePixelClick = (row: number, col: number) => {
        // Redirect to the appropriate URL based on the pixel clicked
        router.push(`/pixel?row=${row}&col=${col}`);
    };

    const handleDownloadSVG = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const svgString = `
            <svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000">
                <image href="${canvas.toDataURL()}" />
            </svg>
        `;

        const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = 'map.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleDownloadPNG = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'map.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div>
            <h2>Click on a pixel to navigate</h2>
            <canvas
                ref={canvasRef}
                width={2000}
                height={2000}
                onClick={(e) => {
                    if (!mapLoaded) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const row = Math.floor(y / 10); // Each cell is 10 pixels in height
                    const col = Math.floor(x / 10); // Each cell is 10 pixels in width
                    handlePixelClick(row, col);
                }}
                style={{ border: '1px solid black', cursor: 'pointer' }}
            />
            <div>
                <button onClick={handleDownloadSVG}>Download SVG</button>
                <button onClick={handleDownloadPNG}>Download PNG</button>
            </div>
        </div>
    );
};

export default ImageMap;
