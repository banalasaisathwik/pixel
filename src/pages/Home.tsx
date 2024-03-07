import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useImageStore } from '~/store/logo';
import { useButtonStore } from '~/store/button';


const Home = () => {
    const gridSize = 80; // Number of squares per row and column
    const [clickedSquares, setClickedSquares] = useState(new Set());
    const { setImage, image } = useImageStore();
    const [areas, setAreas] = useState<{ coords: string; href: string; name: string }[]>([]);
    const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [dialogVisible, setDialogVisible] = useState(false);
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setMouseCoords({ x, y });
        setDialogVisible(true);
    };

    const handleAddArea = () => {
        const newArea = {
            coords: `${mouseCoords.x},${mouseCoords.y},${mouseCoords.x + 10},${mouseCoords.y + 10}`, // Define a small square around the clicked point
            href: link,
            name: name,
        };

        setAreas(prevAreas => [...prevAreas, newArea]); // Utilize the state updater function form of setAreas
        setName('');
        setLink('');
        setDialogVisible(false);
        console.log(areas);

    };


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
            <Image useMap='#image-map' onClick={handleClick} className='min-w-[600px] max-w-[600px] h-full' width={1000} height={1000} alt='India-Map' src={'/map.svg'} />

            <map name="image-map">
                {areas.map((area, index) => (
                    <area
                        key={index}
                        className='w-20 h-20 cursor-pointer'
                        shape="rect"
                        coords={area.coords}
                        href={area.href}
                        alt={area.name}
                        title={area.name}

                    />
                ))}
            </map>

            {dialogVisible && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-2 w-full p-2 border border-gray-300 rounded" />
                    <input type="text" placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} className="mb-2 w-full p-2 border border-gray-300 rounded" />
                    <button onClick={handleAddArea} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Area</button>
                    <button onClick={() => setDialogVisible(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2">Cancel</button>
                </div>
            )} {/* Grid overlay */}
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

