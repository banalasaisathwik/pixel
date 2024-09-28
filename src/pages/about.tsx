import React from 'react';
const AboutUsPage = () => {
    return (

        <section className="w-full min-h-screen md:p-10 flex flex-col justify-center items-center  bg-cover bg-center ">
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 lg:px-10">
                {/* <Image src={'/welcome.png'} alt='welcome' width='1000' height='1000' className="w-10"/> */}
                <div className="text-center mb-8 mt-44 lg:mt-12 lg:px-10">
                    <p className="text-3xl mt-28 lg:px-10 my-4 text-white italic whitespace-pre-line leading-relaxed">
                        <div className="max-w-2xl mx-auto px-4 py-8">
                            <div className="max-w-2xl mx-auto px-4 py-8">
                                <h1 className="text-3xl font-bold text-white text-center mb-4">Welcome to our website, Pixelpreneur!</h1>

                                <p className="text-lg text-gray-300 mb-4">
                                    We’ve built a website called Pixelpreneur (formerly Bharat Startup Sankalan) as a crash course before entering the startup world.
                                    We’re engineering students running a unique business where your company’s ad can be placed on a map of India.
                                    The idea is to advertise thousands of Indian companies on this map, creating a visual representation of India.
                                </p>

                                <p className="text-lg text-gray-300 mb-4">
                                   {" Our main goal is to understand marketing and raise funds for our next startup. This approach may seem unconventional—some might even say crazy —but we’ve learned valuable lessons, especially in controlling emotions and persistence."}
                                </p>

                                <h2 className="text-2xl font-semibold text-white mt-6 mb-2">What’s in it for you?</h2>
                                <p className="text-lg text-gray-300 mb-4">
                                    Traffic! We’re working hard to drive heavy traffic to the site, ensuring your ad gets noticed.
                                    When the site gains attention (which we’re doing everything to ensure), it’ll benefit both you and us.
                                </p>

                                <h2 className="text-2xl font-semibold text-white mt-6 mb-2">Why take the chance on an unknown result?</h2>
                                <p className="text-lg text-gray-300 mb-4">
                                    Think of the potential upside: If the site goes viral, the kind of reach you’ll achieve in a fraction of the cost and time compared to traditional advertising could be massive.
                                    It’s a low-risk, high-reward opportunity that supports innovative thinking while helping us fund our future ventures.
                                </p>

                                <p className="text-lg text-gray-300 mb-4">
                                    I encourage you to take a chance. This could be a rewarding opportunity for your business and a way to support us.
                                    You can directly visit <a href="https://pixelpreneur.in" className="text-blue-400 underline">pixelpreneur.in</a> and secure your ad space today.
                                </p>
                            </div>
                        </div>
                    </p>
                    <h1 className="text-4xl font-bold mt-10 text-orange-500">
                        {"Jai Hind! Bharat Mata Ki Jai!"}
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default AboutUsPage;
