import React from 'react';

const AboutUsPage = () => {
    return (

        <section className="w-full min-h-screen flex flex-col justify-center items-center  bg-cover bg-center ">
            <div className="text-center mb-8 mt-44 lg:mt-12 lg:px-10">

                <p className="text-3xl mt-28 lg:px-10 my-4 text-white italic whitespace-pre-line">
                  { " Welcome to a world of endless possibilities. BharatStartupSankalan is more than just a map—it's a canvas of opportunities waiting to be explored. Here, businesses come alive with each pixel, telling stories that captivate and inspire."}
                    <br/>
                    <br />
                    {"We're passionate about showcasing the heartbeat of Indian entrepreneurship. Our platform is your gateway to visibility, connecting you with a diverse audience eager to engage with your brand. Each click unravels a new chapter, inviting you to be part of something extraordinary."}
                    <br/>
                    <br />
                    {"Join us as we redefine the way businesses connect and thrive. Let your journey with BharatStartupSankalan be the start of something remarkable."}
                       </p>

                <h1 className="text-4xl font-bold mt-10 text-orange-500">Jai Hind! Bharat Mata Ki Jai!</h1>
            </div>
        </section>
    );
};

export default AboutUsPage;
