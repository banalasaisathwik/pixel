// components/Canvas.tsx

import React, { useState } from 'react';

interface GridCoords {
    x: number;
    y: number;
}

interface CanvasProps {
    onGridSelect: (coords: GridCoords[]) => void;
}

const Canvas: React.FC<CanvasProps> = ({ onGridSelect }) => {
    const [selectedGrids, setSelectedGrids] = useState<GridCoords[]>([]);

    const handleClick = (x: number, y: number) => {
        const newGrid = { x, y };
        setSelectedGrids([...selectedGrids, newGrid]);
    };

    const handleClear = () => {
        setSelectedGrids([]);
    };

    const handleConfirm = () => {
        onGridSelect(selectedGrids);
        setSelectedGrids([]);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                <button onClick={handleClear}>Clear</button>
                <button onClick={handleConfirm}>Confirm</button>
            </div>
            <div style={{ border: '1px solid black', width: '500px', height: '500px' }}>
                {Array.from({ length: 10 }, (_, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row' }}>
                        {Array.from({ length: 10 }, (_, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                style={{
                                    width: '50px',
                                    height: '20px',
                                    backgroundColor: selectedGrids.some(grid => grid.x === colIndex && grid.y === rowIndex) ? 'red' : 'white',
                                    border: '1px solid black'
                                }}
                                onClick={() => handleClick(colIndex, rowIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Canvas;
