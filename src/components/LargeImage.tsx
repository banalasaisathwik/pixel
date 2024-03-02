// components/LargeImage.tsx
import React from 'react';
import Image from 'next/image';
import MouseTracker from './coordTracker';

interface PixelArea {
    coords: string;
    onClick: () => void;
}

interface LargeImageProps {
    imageURL: string;
    areas: PixelArea[];
}

const LargeImage: React.FC<LargeImageProps> = ({ imageURL, areas }) => {
    const handleAreaClick = () => {
        window.location.href = 'https://www.google.com'; // Redirect to google.com
    };

    // Generate the area coordinates for the first row
    const firstRowCoordinates = Array.from({ length: 100 }, (_, index) => {
        const x1 = index * 10; // Start x coordinate for the area
        const y1 = 0; // Start y coordinate for the area
        const x2 = x1 + 10; // End x coordinate for the area
        const y2 = 10; // End y coordinate for the area
        return `${x1},${y1},${x2},${y2}`;
    });

    // Create area elements for the first row
    const firstRowAreas = firstRowCoordinates.map((coords, index) => ({
        coords,
        onClick: handleAreaClick,
        key: `firstRow-${index}` // Unique key for each area
    }));
    
    
    return (
        <div style={{ position: 'relative', width: '1000px', height: '1000px' }}>
            <Image src={imageURL} alt="Large Image" width={1000} height={1000} useMap="#pixelMap" />
            <map name="pixelMap">
                <area shape="rect" coords="34,44,270,350" alt="Computer" href="computer.htm" />
                <area shape="rect" coords="290,172,333,250" alt="Phone" href="phone.htm" />
                <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="https://www.google.com/" />
                <area target="_blank" alt="hello" title="hello" href="https://www.w3schools.com/tags/att_area_coords.asp" coords="337,162,178,128" shape="rect"/>

            </map>

        </div>
    );
};

export default LargeImage;
