import React from 'react'
import Image from 'next/image';

interface Props {
    onClose: () => void;
}

const PopUp: React.FC<Props> = ({ onClose }) => {
    const handleClose = () => {
        onClose();
    };
    return (
        <div className="fixed  z-[999] inset-0 max-h-[95vh] overflow-y-scroll ">
            <div className="flex items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed z-[999]  inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-black opacity-85"></div>
                </div>
                <div
                    className=" left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%] absolute z-[9999]  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl  transition-all sm:my-8  sm:max-w-xl w-[90%] sm:p-6">
                    <div className="sm:flex sm:items-start">

                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h1 className="text-4xl font-bold text-center border-b-2 pb-2 text-gray-900">
                                Welcome Note 🙏
                            </h1>
                            <div >
                                <div className="py-2">
                                    <p className="text-lg mb-4">
                                        {  " Welcome to pixelpreneur! Click on an ad to check out the brand. Got a brand? Don’t wait—advertise here today!"}
                                      </p>
                                    <Image src="title1.jpg" alt="image" width="700" height="700" className="mx-auto" />
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                    <span className=" flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <button type="button"
                            onClick={handleClose}
                            className="inline-flex justify-center w-full  rounded-md border border-gray-300 bg-black text-white p-4 text-xl  shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 ">
                             Continue
                        </button>
                    </span>

                </div>
            </div>
        </div>
    )
}

export default PopUp