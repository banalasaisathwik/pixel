// components/MouseTracker.tsx

import React, { useState } from 'react';
import Canvas from './Canvas';

interface Coords {
    x: number;
    y: number;
}

interface MouseTrackerProps {
    children: React.ReactElement;
}

const MouseTracker: React.FC<MouseTrackerProps> = ({ children }) => {
    const [markedCoords, setMarkedCoords] = useState<Coords[]>([]);
    const [allowMarking, setAllowMarking] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleBuyButtonClick = () => {
        // Toggle the allow marking state when the "Buy" button is clicked
        setAllowMarking(!allowMarking);
    };

    const handleGridSelect = (coords: Coords[]) => {
        setMarkedCoords(coords);
    };

    const handleConfirmClick = () => {
        if (markedCoords) {
            // Assuming coordinates are valid and selecting an image here
            const image = prompt('Please enter the URL of the image:', 'https://example.com/image.jpg');
            if (image) {
                setSelectedImage(image);
            }
        }
    };

    return (
        <div>
            <header>
                <button onClick={handleBuyButtonClick}>{allowMarking ? 'Cancel' : 'Buy'}</button>
            </header>
            {allowMarking && (
                <div>
                    <Canvas onGridSelect={handleGridSelect} />
                    <div>
                        Selected Pixels: {markedCoords.length}
                        {markedCoords && (
                            <div>
                                Coords: x1: {markedCoords[0]?.x}, y1: {markedCoords[0]?.y}, x2: {markedCoords[1]?.x}, y2: {markedCoords[1]?.y}
                                <button onClick={handleConfirmClick}>Confirm</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {selectedImage && (
                <div>
                    <img src={selectedImage} alt="Selected Image" />
                    <map name="selected-area">
                        <area shape="rect" coords={`${markedCoords[0]?.x},${markedCoords[0]?.y},${markedCoords[1]?.x},${markedCoords[1]?.y}`} />
                    </map>
                </div>
            )}
        </div>
    );
};

export default MouseTracker;
