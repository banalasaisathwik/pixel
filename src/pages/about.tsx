import React from 'react';

const AboutUsPage = () => {
    return (
        <section className="w-full min-h-screen md:p-10 flex flex-col justify-center items-center bg-cover bg-center">
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 lg:px-10">
                <div className="text-center mb-8 mt-44 lg:mt-12 lg:px-10">
                    <div className="max-w-2xl mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold my-10 text-white text-center mb-4">
                            Welcome to Pixelpreneur!
                        </h1>
                        <p className="text-lg text-gray-300 mb-4">
                           {" Hi, I'm Sathwik, the creator of Pixelpreneur. I built this website with the sole purpose of giving my mom and dad a comfortable life while raising funds for my next startup idea."}
                        </p>
                        <p className="text-lg text-gray-300 mb-4">
                            The concept is simple: you can buy ad space on a map of India, with each space being 10px by 10px in size. The cost is ₹150 per pixel.
                        </p>
                        <h2 className="text-2xl font-semibold text-white mt-6 mb-2">
                            What’s in it for you?
                        </h2>
                        <p className="text-lg text-gray-300 mb-4">
                            Our goal is to make Pixelpreneur go viral and bring in massive traffic. This means your ad gets exceptional viewership at an incredibly low cost!
                        </p>
                        <h2 className="text-2xl font-semibold text-white mt-6 mb-2">
                            Why the India Map?
                        </h2>
                        <p className="text-lg text-gray-300 mb-4">
                            The map of India symbolizes the nation’s entrepreneurial spirit. Each ad contributes to a collective representation of businesses across India, celebrating innovation and progress.
                        </p>
                        <h2 className="text-2xl font-semibold text-white mt-6 mb-2">
                            The Dream
                        </h2>
                        <p className="text-lg text-gray-300 mb-4">
                            Through this initiative, I aim to generate at least ₹10 crore while helping businesses like yours gain visibility. This project is my stepping stone to launching a new startup that’s ready to make an impact.
                        </p>
                        <p className="text-lg text-gray-300 mb-4">
                            So, click on an ad on the India map to see the magic! Join me on this journey of innovation and growth.
                        </p>
                        <p className="text-lg text-gray-300 mb-4">
                            Thank you for supporting Pixelpreneur and being part of this entrepreneurial adventure!
                        </p>
                    </div>
                    <h1 className="text-4xl font-bold mt-10 text-orange-500">
                        Jai Hind! Bharat Mata Ki Jai!
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default AboutUsPage;
