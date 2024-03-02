// pages/PixelArtPage.tsx
import React, { useState } from 'react';
import LargeImage from '../components/LargeImage';

export interface PixelArea {
  coords: string;
  onClick: () => void;
}

const PixelArtPage: React.FC = () => {
  const [purchasedPixels, setPurchasedPixels] = useState<PixelArea[]>([]);

  // Placeholder function for handling pixel purchase
  const handlePixelPurchase = () => {
    // Generate random coordinates for testing
    const randomCoordinates = Array.from({ length: 10 }, () => {
      const x1 = Math.floor(Math.random() * 990); // Random x coordinate
      const y1 = Math.floor(Math.random() * 990); // Random y coordinate
      const x2 = x1 + 10; // Adjust for pixel size
      const y2 = y1 + 10; // Adjust for pixel size
      return `${x1},${y1},${x2},${y2}`;
    });

    // Create PixelArea objects
    const pixels: PixelArea[] = randomCoordinates.map((coords) => ({
      coords,
      onClick: () => console.log('Clicked pixel:', coords),
    }));

    // Set purchased pixels
    setPurchasedPixels(pixels);

    // Generate random image URLs for each purchased pixel
    const randomImages = Array.from({ length: pixels.length }, () =>
      `https://via.placeholder.com/150?text=Image`
    );

    // Log the generated image URLs
    console.log('Generated image URLs:', randomImages);
  };

  return (
    <div>
      <h1>hello</h1>
      <LargeImage imageURL="/image.png" areas={purchasedPixels} />
      <button onClick={handlePixelPurchase}>Buy Pixels</button>
    </div>
  );
};

export default PixelArtPage;
