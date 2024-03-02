import React from 'react';

class Grid extends React.Component {
    render() {
        const numRows = 100;
        const numCols = 100;

        // Calculate the width and height of each cell
        const cellSize = 1000 / numRows;

        // Create grid cells
        const gridCells = [];
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const cellKey = `${row}-${col}`;
                const cellStyle = {
                    width: cellSize,
                    height: cellSize,
                    border: '1px solid black',
                    display: 'inline-block', // Use display instead of float
                };
                gridCells.push(<div key={cellKey} style={cellStyle}></div>);
            }
        }

        return (
            <div className="grid-container">
                {/* Render image */}
                <img src="image.png" alt="Your Image" className="grid-image" />

                {/* Render grid */}
                <div className="grid">{gridCells}</div>
            </div>
        );
    }
}

function App() {
    return (
        <div className="App">
            <Grid />
        </div>
    );
}

export default App;
