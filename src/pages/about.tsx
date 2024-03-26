import React from 'react';

const AboutUsPage = () => {
    return (

        <section className="w-full min-h-screen flex flex-col justify-center items-center bg-[url('/bg.avif')] bg-cover bg-center ">
            <div className="text-center mb-8 mt-12">
              
                <p className="text-3xl mb-2 mt-20 text-white italic">
                    This is the place to showcase the evolution of startups over the last 10 years and demonstrate the success of government policies.
                    <br />
                    Despite the ups and downs in the startup ecosystem, it&apos;s a positive start for our country.
                    <br />
                    For founders, it&apos;s a great opportunity to advertise their company at a fraction of the cost and reap the benefits as traffic increases.
                </p>

                <h1 className="text-4xl font-bold text-orange-500">Jai Hind! Bharat Mata Ki Jai!</h1>
            </div>
        </section>
    );
};

export default AboutUsPage;