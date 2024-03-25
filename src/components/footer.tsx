import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-cover w-full bg-bottom bg-[url('/bg.avif')]  py-8 px-4 shadow-md z-10 flex flex-col justify-center items-center lg:flex-col lg:justify-content-center align-items-center ">
    <div className="text-base text-gray-500 text-center ">Copyright © 2024 Bharat ki startup sankalan</div>
    <div className="flex flex-col justify-center mt-4  w-full text-center lg:flex-row ml-auto gap-4">
        <a href="#" className="text-gray-500 text-base hover:text-gray-400 ">Terms &
            Conditions
        </a>
        <a href="#" className="text-gray-500 text-base hover:text-gray-400 ">Privacy
            Policy
        </a>
        <a href="mailto:info@bhartkistartupsankalan.in" className="text-gray-500 text-base hover:text-gray-400 ">info@bhartkistartupsankalan.in</a>

    </div>
</footer>
  )
}

export default Footer
