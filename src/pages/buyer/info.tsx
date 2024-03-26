import Link from 'next/link'
import React from 'react'

const Info = () => {
    return (
        <section className="w-full min-h-screen flex flex-col justify-center items-center bg-[url('/bg.avif')] bg-cover bg-center ">
            <div className="mx-auto mt-48 flex flex-col justify-center items-center  px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-bold uppercase tracking-widest text-gray-200">How It Works</p>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">Launch your block
                        in
                        4 easy steps
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg font-normal text-gray-200 lg:text-xl lg:leading-8">
                        Create your own block with us and launch it with just 4 easy steps
                    </p>
                </div>
                <div className=" mt-16">
                    <div className="">
                       
                        <div className="mx-auto flex-col lg:flex-row   gap-8  lg:mx-0 lg:max-w-6xl flex">
                            <div>
                                <div className="flex items-center text-lg font-semibold leading-6 text-blue-400">
                                    <svg viewBox="0 0 4 4" className="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                        <circle cx="2" cy="2" r="2" fill="currentColor"></circle>
                                    </svg>
                                    Step 1
                                    <div className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-500/80 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                                </div>
                                <p className="mt-6 text-lg font-semibold leading-8 tracking-wide text-white">Create an Account:</p>
                                <p className="mt-1 text-base leading-7 text-gray-300 dark:text-gray-400">Get started by registering for an account. No complex onboarding processes.</p>
                            </div>
                            <div>
                                <div className="flex items-center  text-lg font-semibold leading-6 text-blue-400">
                                    <svg viewBox="0 0 4 4" className="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                        <circle cx="2" cy="2" r="2" fill="currentColor"></circle>
                                    </svg>
                                    Step 2
                                    <div className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-500/80 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                                </div>
                                <p className="mt-6 text-lg font-semibold leading-8 tracking-wide text-white">Choose Features:</p>
                                <p className="mt-1 text-base leading-7 text-gray-300 dark:text-gray-400">Select from a variety of features and functionalities tailored to your needs.</p>
                            </div>
                            <div>
                                <div className="flex items-center  text-lg font-semibold leading-6 text-blue-400">
                                    <svg viewBox="0 0 4 4" className="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                        <circle cx="2" cy="2" r="2" fill="currentColor"></circle>
                                    </svg>
                                    Step 3
                                    <div className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-500/80 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                                </div>
                                <p className="mt-6 text-lg font-semibold leading-8 tracking-wide text-white">Customize Settings:</p>
                                <p className="mt-1 text-base leading-7 text-gray-300 dark:text-gray-400">Tailor the platform to your preferences. Define settings, alerts, and integrations.</p>
                            </div>
                            <div>
                                <div className="flex items-center  text-lg font-semibold leading-6 text-blue-400">
                                    <svg viewBox="0 0 4 4" className="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                        <circle cx="2" cy="2" r="2" fill="currentColor"></circle>
                                    </svg>
                                    Step 4
                                    <div className="absolute -ml-2 lg:hidden block h-px w-screen -translate-x-full bg-gray-500/80 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                                
                                 </div>
                                <p className="mt-6 text-lg font-semibold leading-8 tracking-wide text-white">Activate and Explore:</p>
                                <p className="mt-1 text-base leading-7 text-gray-300 dark:text-gray-400">Activate your account and start exploring the possibilities of our platform.</p>
                            </div>
                        </div>
                    </div>
                </div>
              <Link className='text-black my-10 font-bold text-2xl w-40 text-center p-2 rounded-lg bg-white ' href={"/buyer/home"}>Get Started</Link>
            </div>
        </section>
    )
}

export default Info