import React, { useState } from 'react';
import Image from 'next/image';

interface Pixel {
  row: number;
  col: number;
}

const IndiaMap: React.FC = () => {
  const [selectedPixels, setSelectedPixels] = useState<Pixel[]>([]);
  const [gridOff, setgridOff] = useState(true);

  const handlePixelClick = (row: number, col: number) => {
    const pixelIndex = selectedPixels.findIndex(pixel => pixel.row === row && pixel.col === col);
    if (pixelIndex === -1) {
      setSelectedPixels([...selectedPixels, { row, col }]);
    } else {
      const updatedPixels = [...selectedPixels];
      updatedPixels.splice(pixelIndex, 1);
      setSelectedPixels(updatedPixels);
    }
  };

  const handlePurchase = () => {
    if (selectedPixels.length === 0) {
      alert('Please select at least one pixel to purchase.');
    } else if (selectedPixels.length % 2 !== 0) {
      alert('Please select an even number of pixels.');
    } else {
      console.log('Selected pixels:', selectedPixels);
      alert('Pixels purchased successfully!');
    }
  };

  const generatePixels = (): JSX.Element[] => {
    const pixels: JSX.Element[] = [];
    const numRows = 100; // Adjust as needed
    const numCols = 100; // Adjust as needed
    const pixelWidth = 8; // Adjust based on map width
    const pixelHeight = 8; // Adjust based on map height
    const imageUrl = '/path/to/image.png'; // Replace with the path to your image

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const pixelX = col * pixelWidth;
        const pixelY = row * pixelHeight;
        const isSelected = selectedPixels.some(pixel => pixel.row === row && pixel.col === col);

        
        pixels.push(
          <g key={`${row}-${col}`} onClick={() => handlePixelClick(row, col)}>
            <rect
              x={pixelX}
              y={pixelY}
              width={pixelWidth}
              height={pixelHeight}
              fill={isSelected ? 'rgba(0, 255, 0, 0.5)' : 'transparent'}
              stroke="#000"
              strokeWidth={!gridOff ? "0.5" : "0"}
            />
            {isSelected && (
              <image
                x={pixelX}
                y={pixelY}
                width={pixelWidth}
                height={pixelHeight}
                xlinkHref={imageUrl}
              />
            )}
          </g>
        );
      }
    }

    return pixels;
  };

  return (
    <div>
      <div>      <button onClick={() => setgridOff(prev => !prev)}> button </button>
</div>
    <div style={{ position: 'relative', width: '800px', height: '600px' }}>
      <Image src={'/map.svg'} alt="India Map" width={800} height={600} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {generatePixels()}
      </svg>
      <button onClick={handlePurchase}>Purchase Selected Pixels</button>
    </div>
    </div>
  );
};

export default IndiaMap;
