import React, { useState } from 'react';
import Image from 'next/image';

const ImageMapEditor: React.FC = () => {
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



    return (
        <div className='flex justify-center'>
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
            )}
        </div>
    );
};

export default ImageMapEditor;
