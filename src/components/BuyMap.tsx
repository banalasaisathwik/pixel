import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

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
    const [isChecked, setIsChecked] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (!isChecked) {
            // If the checkbox is not checked, don't proceed with the confirmation
            alert("Please confirm that you've read the policy and terms & conditions.");
            return;
        }
        // Proceed with the confirmation
        onConfirm();
    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start">
            <div className="bg-white p-10 rounded-lg">
                <h2 className="font-bold text-2xl">Confirm Purchase</h2>
                <p className='text-lg'>You are about to purchase {pixelCount} pixels. Do you wish to proceed?</p>
                <p className='text-lg'>(Please note that selecting areas outside the map will result in rejection of your request.)</p>

                {/* Checkbox for confirming policy and terms & conditions */}
                <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        id="confirmCheckbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="mr-2"
                    />
                    <label htmlFor="confirmCheckbox">I have read and agree to the policy and terms & conditions.</label>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                    <button onClick={handleConfirm} className="px-4 py-2 rounded bg-blue-500 text-white">Confirm</button>
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

    const { data: soldOutPixelsQuery, isLoading: soldoutLoading } = api.pxlR.soldoutPixel.useQuery();
    const reservePixel = api.trx.reservingPixel.useMutation({

        onError: (error) => {
            console.error('Error while purchasing:', error);
            setBtnDisabled(false);
            toast.error("failed");
        },
        onSettled(data) {
            setBtnDisabled(false);
            data?.success ? toast.success("successful") : toast.error(data?.message)
            if (data?.success) {
                setTimeout(() => {
                    void router.replace('/buyer/payment');
                }, 3000);
            }
            else {
                handleClearPixels();
            }

        },
    });
    const isDataLoading = soldoutLoading;



    useEffect(() => {
        if (soldOutPixelsQuery) {
            setSoldOutPixels(soldOutPixelsQuery);
        }
    }, [soldOutPixelsQuery]);

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

            }
            );
            const blockSize = 10; // Size of each block
            const gridColor = 'rgba(169, 169, 169, 0.07)'; // Semi-transparent blue
            for (let x = 0; x < canvas.width; x += blockSize) {
                for (let y = 0; y < canvas.height; y += blockSize) {
                    ctx.fillStyle = gridColor;
                    ctx.fillRect(x, y, blockSize - 2, blockSize - 2); // Draw blue blocks
                }
            }
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
            // Check if the clicked pixel is not sold out
            const isPixelSoldOut = soldOutPixels.some(pixel => pixel.x === col && pixel.y === row);

            if (isPixelSoldOut) {
                toast.error('This pixel is already sold out!');
                return;
            }

            const alreadySelected = selectedPixels.some(pixel => isAdjacent(pixel, { row, col }));

            if (selectedPixels.length === 0 || alreadySelected) {
                setSelectedPixels(prevPixels => [...prevPixels, { row, col }]);
            } else {
                toast.error('You can only select adjacent pixels!');
            }
        }
    };
    const handleBuyNowClick = () => {

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
        reservePixel.mutate({ coords: formattedSelectedPixels });
    };

    const handleDownloadPNG = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Convert canvas to a Blob
        canvas.toBlob((blob) => {
            if (!blob) return;

            // Create a download link
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'map.png';

            // Click the link to trigger the download
            downloadLink.click();

            // Clean up
            URL.revokeObjectURL(downloadLink.href);
        }, 'image/png');
    };
    if (isDataLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }
    return (
        <>
            <nav className="w-full h-32 z-[100] fixed top-0 left-0 bg-black block items-center font-heading-narrow">
                <div className="px-10 py-4 flex justify-between items-center w-full">
                    <div className="flex">
                        <button
                            className="p-4 text-lg rounded text-black bg-white mr-2"
                            disabled={btnDisabled || selectedPixels.length === 0}
                            onClick={handleBuyNowClick}
                        >
                            Proceed to checkout
                        </button>
                        <button
                            className="p-4 text-lg rounded text-black bg-white"
                            onClick={handleClearPixels}
                        >
                            Clear Selected Pixels
                        </button>
                    </div>
                    <p className="text-xl text-center text-white">
                        Make sure your Selected shape matches your image shape,<br />
                        for a good outcome.
                    </p>
                    <div className="flex flex-col gap-4 justify-end">
                    <p className="text-xl  text-white">
                        Click on the map to select Pixels
                    </p>
                       <div className='flex gap-10'>
                       <div className="flex items-center mr-8">
                            <div className="w-3 h-3 bg-red-700 mr-2"></div>
                            <p className="text-white">Sold-out pixels</p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-800 mr-2"></div>
                            <p className="text-white">Selected pixels</p>
                        </div>
                       </div>
                      
                    </div>

                    <ToastContainer />

                    <ConfirmDialog
                        isOpen={isConfirmOpen}
                        onClose={() => setIsConfirmOpen(false)}
                        onConfirm={confirmPurchase}
                        pixelCount={selectedPixels.length}
                    />
                </div>
                

            </nav>

            <div className="bg-cover bg-center w-full min-h-screen overflow-y-auto pt-10">

                <div className='absolute top-20 right-0'>
                    <div className="relative m-16">
                        <span className="absolute -z-10  w-full h-full inset-1 bg-red-500 rounded-xl"></span>
                        <button className="absolute py-1 z-10 px-3 -left-8 -top-2 -rotate-[10deg] black_border bg-red-500 text-white font-bold">
                            Tip
                        </button>

                        <div className="p-8 border border-black purple_border bg-white rounded-xl z-20">

                            If you cannot see the map, please refresh the page!!

                        </div>
                    </div>
                </div>


                <canvas
                    ref={canvasRef}
                    width={2000}
                    height={2000}
                    onClick={handleCanvasClick}
                    style={{ border: '1px solid black', cursor: mapLoaded ? 'pointer' : 'default' }}
                />

                <button
                    className="px-4 py-2 rounded bg-blue-500 text-white"
                    onClick={handleDownloadPNG}
                >
                    Download PNG
                </button>



            </div >
        </>
    );
};

export default BuyPage;
