import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useButtonStore } from '~/store/button';
import { useImageStore } from '~/store/logo';
import RazorpayButton from './RazorpayButton';

const Home = () => {
    const gridSize = 80; // Number of squares per row and column
    const [clickedSquares, setClickedSquares] = useState(new Set());
    const { setImage, image } = useImageStore();


    const { clicked, setClicked } = useButtonStore();

    // Function to handle grid square click
    const handleSquareClick = useCallback((index: number) => {
        // Check if the clicked square is already selected
        if (clickedSquares.has(index)) {
            // Deselect the square
            setClickedSquares(prevClickedSquares => {
                const newClickedSquares = new Set(prevClickedSquares);
                newClickedSquares.delete(index); // Remove the square from the set
                return newClickedSquares;
            });
        } else {
            // Check if the clicked square is clickable
            if (isSquareClickable(index)) {
                // Select the square
                setClickedSquares(prevClickedSquares => {
                    const newClickedSquares = new Set(prevClickedSquares);
                    newClickedSquares.add(index);
                    return newClickedSquares;
                });
            }
        }
    }, [clickedSquares]);

    // Function to check if a square is clickable
    const isSquareClickable = useCallback((index: number) => {
        if (clickedSquares.size === 0) {
            return true; // Allow clicking on any square if no squares have been clicked yet
        }
        if (clickedSquares.has(index)) {
            return false; // Already clicked squares are not clickable
        }
        // Get row and column of the clicked square
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        // Check if any surrounding square is clicked
        for (let i = Math.max(0, row - 1); i <= Math.min(gridSize - 1, row + 1); i++) {
            for (let j = Math.max(0, col - 1); j <= Math.min(gridSize - 1, col + 1); j++) {
                const surroundingIndex = i * gridSize + j;
                if (clickedSquares.has(surroundingIndex)) {
                    return true;
                }
            }
        }
        return false;
    }, [clickedSquares]);

    // Function to determine if a square should have the "not-allowed" cursor
    const shouldShowNotAllowedCursor = useCallback((index: number) => {
        return clickedSquares.has(index) && !isSquareClickable(index);
    }, [clickedSquares, isSquareClickable]);

    return (
        <div className='relative w-full h-full flex justify-center items-center'>
          
            {/* Image */}
            <Image className='w-[60%] h-full' width={1000} height={1000} alt='India-Map' src={'/map.svg'} />
            {/* Grid overlay */}
            {
                clicked && (
                    <div className="absolute z-50 top-0 left-0 w-full h-full" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}>
                        {/* Create grid squares */}
                        {[...Array(gridSize * gridSize)].map((_, index) => (
                            <div
                                className='w-5 h-5'
                                key={index}
                                style={{
                                    border: '0.1px dashed rgba(0, 0, 0, 0.2)',
                                    cursor: (isSquareClickable(index) ? 'pointer' : 'not-allowed'),
                                    backgroundColor: clickedSquares.has(index) ? 'rgba(0, 0, 0, 0.6)' : 'transparent'
                                }}
                                onClick={() => handleSquareClick(index)}
                                aria-label={`Square ${index + 1}`}

                            >
                                {clickedSquares.has(index) && image && (
                                    <img src={URL.createObjectURL(image)} alt="Selected Image" className='w-5 h-5' />
                                )}
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Home;