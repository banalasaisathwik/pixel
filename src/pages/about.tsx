import React from 'react';

const AboutUsPage = () => {
    return (

        <section className="w-full min-h-screen flex flex-col justify-center items-center  bg-cover bg-center ">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 text-center px-4 lg:px-10">
                <div className="text-center mb-8 mt-44 lg:mt-12 lg:px-10">
                    <p className="text-3xl mt-28 lg:px-10 my-4 text-white italic whitespace-pre-line leading-relaxed">
                        {"Welcome to our website BharatStartupSankalan!"}
                        <br />
                        <br />
                        {"What are we doing?"}
                        <br />
                        <br />
                        {"We’re selling ad spaces and planning to make over 10 crores. We’re going to use this money for our next startup."}
                        <br />
                        <br />
                        {"We are going to introduce a new way of raising money."}
                        <br />
                        <br />
                        {"Share this with your friends to help make it viral and show that success can come from anything."}
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
