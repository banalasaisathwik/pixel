import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Pixel {
    row: number;
    col: number;
}

const ConfirmDialog: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    pixelCount: number;
}> = ({ isOpen, onClose, onConfirm, pixelCount }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
                <h2 className="font-bold text-lg">Confirm Purchase</h2>
                <p>You are about to purchase {pixelCount} pixels. Do you wish to proceed?</p>
                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded bg-blue-500 text-white">Confirm</button>
                </div>
            </div>
        </div>
    );
};

const BuyPage: React.FC = () => {
    const router = useRouter();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [selectedPixels, setSelectedPixels] = useState<Pixel[]>([]);
    const [soldOutPixels, setSoldOutPixels] = useState<{ x: number; y: number }[]>([]);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const { data: quantity } = api.pxlR.quantity.useQuery();
    const soldOutPixelsQuery = api.pxlR.soldoutPixel.useQuery();
    const purchaseMutation = api.trx.buyPixel.useMutation({
        onSuccess: () => {
            setBtnDisabled(false);
            toast.success("successful")
            setTimeout(() => {
                router.push('/buyer/home');
            }, 2000); 
        },
        onError: (error) => {
            console.error('Error while purchasing:', error);
            setBtnDisabled(false);
            toast.error("failed");
        }
    });

    useEffect(() => {
        if (soldOutPixelsQuery.data) {
            setSoldOutPixels(soldOutPixelsQuery.data);
        }
    }, [soldOutPixelsQuery.data]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.src = '/map.svg';
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'red';
            soldOutPixels.forEach(pixel => {
                ctx.fillRect(pixel.x * 10, pixel.y * 10, 10, 10);
            });

            ctx.fillStyle = 'blue';
            selectedPixels.forEach(pixel => {
                ctx.fillRect(pixel.col * 10, pixel.row * 10, 10, 10);
            });

            setMapLoaded(true); // Moved mapLoaded state update here
        };
    }, [selectedPixels, soldOutPixels]);

    const isAdjacent = (pixel1: Pixel, pixel2: Pixel) => {
        const dx = Math.abs(pixel1.col - pixel2.col);
        const dy = Math.abs(pixel1.row - pixel2.row);
        return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
    };

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!mapLoaded) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const row = Math.floor(y / 10);
        const col = Math.floor(x / 10);

        const pixelIndex = selectedPixels.findIndex(pixel => pixel.row === row && pixel.col === col);

        if (pixelIndex !== -1) {
            // If the clicked pixel is already selected, remove it from the selectedPixels array
            setSelectedPixels(prevPixels => prevPixels.filter((_, index) => index !== pixelIndex));
        } else {
            const alreadySelected = selectedPixels.some(pixel => isAdjacent(pixel, { row, col }));

            if (selectedPixels.length === 0 || alreadySelected) {
                setSelectedPixels(prevPixels => [...prevPixels, { row, col }]);
            } else {
                toast.error('You can only select adjacent pixels!');
            }
        }
    };
    const handleBuyNowClick = () => {
        if (typeof quantity === 'number') {
            if (selectedPixels.length !== quantity) {
                toast.error(`Please select exactly ${quantity} pixels to buy.`);
                return;
            }
        }
        setIsConfirmOpen(true);
    };

    const handleClearPixels = () => {
        setSelectedPixels([]);
        window.location.reload();
    };

    const confirmPurchase = () => {
        setIsConfirmOpen(false);
        setBtnDisabled(true);
        const formattedSelectedPixels = selectedPixels.map(pixel => ({
            x: pixel.col,
            y: pixel.row,
        }));
        purchaseMutation.mutate({ coords: formattedSelectedPixels });
    };

    const handleDownloadPNG = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'map.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div>
            <button onClick={() => console.log(selectedPixels)}>Selected Pixels</button>
            <button disabled={btnDisabled || selectedPixels.length === 0} onClick={handleBuyNowClick}>Buy Now</button>
            <button onClick={handleClearPixels}>Clear Selected Pixels</button>
            <canvas
                ref={canvasRef}
                width={2000}
                height={2000}
                onClick={handleCanvasClick}
                style={{ border: '1px solid black', cursor: mapLoaded ? 'pointer' : 'default' }}
            />

            <button onClick={handleDownloadPNG}>Download PNG</button>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmPurchase}
                pixelCount={selectedPixels.length}
            />

            <ToastContainer />
        </div>
    );
};

export default BuyPage;
