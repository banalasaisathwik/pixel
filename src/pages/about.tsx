import React from 'react';

const AboutUsPage = () => {
    return (

        <section className="w-full min-h-screen flex flex-col justify-center items-center  bg-cover bg-center ">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 text-center px-4 lg:px-10">
                <div className="text-center mb-8 mt-44 lg:mt-12 lg:px-10">
                    <p className="text-3xl mt-28 lg:px-10 my-4 text-white italic whitespace-pre-line leading-relaxed">
                        {"Welcome to our website BharatStartupSankalan!"}
                        <br />
                        Our goal is to offer a unique advertising platform on a map of India, where businesses can purchase mini ad spaces. This initiative is designed to highlight India's vibrant startup ecosystem and provide an innovative way for companies to gain visibility while also generating revenue.

                        By investing in our platform, you're making a one-time commitment with the potential for significant returns. Your investment could attract more customers and deliver impressive results once the project gains traction.

                        For more information or to purchase ad space, click the "Buy Space" button and follow the instructions. The minimum purchase is 10x10 pixels. We’re excited to showcase your business and contribute to its success.
                    </p>
                    <h1 className="text-4xl font-bold mt-10 text-orange-500">
                        Jai Hind! Bharat Mata Ki Jai!
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default AboutUsPage;
