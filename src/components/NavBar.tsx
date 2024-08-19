import { useNavbarMenuToggle, useNavbarVisibility } from '../hooks'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { view } from '../utils/animations'
import NavMenuButton from './NavMenuButton'
import NavMobileMenu from './NavMobileMenu'
import Logo from './Logo'
import { FaCircle, FaLinkedin } from "react-icons/fa";
import { FiInstagram, FiTwitter } from 'react-icons/fi'

const Navbar = () => {
    const { navOpen, changeNavMenu, toggleNavMenu } = useNavbarMenuToggle()
    const { textWhite, values } = useNavbarVisibility()
    const isFillWhite = textWhite && values!.isTextWhite && !navOpen;

    return (
        <nav className={`block w-full h-auto md:h-16 sm:h-auto z-[100] ${navOpen ? 'fixed top-0 left-0 bottom-0 z-[200] bg-orange-500' : 'absolute'} md:bottom-auto font-heading-narrow`}>
            <div className='w-full px-4 py-2 md:px-11 bg-[#000000cd] md:flex justify-start lg:justify-between items-center md:h-[80px] xl:h-[120px]'>
                {/* Navigation desktop - left */}
                <div className='lg:w-80 text-center'>
                    <Logo fillWhite={isFillWhite} />
                </div>

                {/* Navigation desktop - right */}
                <motion.ul variants={view} initial='initial' whileInView='animate' className='hidden md:flex flex-row flex-wrap items-baseline gap-x-4'>
                    <li className='text-orange-700 flex items-center gap-x-2 text-2xl'>
                        <FaCircle size={10} />
                        <p>{"Mini Billboards on India Map"}</p>
                    </li>
                    <li className='text-white flex items-center gap-x-2 text-2xl'>
                        <FaCircle size={10} />
                        <p>1 Pixel @ ₹150</p>
                    </li>
                    <li className="text-2xl text-white md:text-2xl mx-auto font-semibold border-2 p-2 hover:bg-orange-700 hover:text-black align-top uppercase">
                        <Link href="/buyer/info">Buy space</Link>
                    </li>
                </motion.ul>

                {/* Mobile Navigation Menu */}
                {navOpen && <NavMobileMenu closeMenu={changeNavMenu} />}

                {/* Hamburger Menu Button */}
                <NavMenuButton isNavOpen={navOpen} toggleNavMenu={toggleNavMenu} />
            </div>

            <div className='border-t-2 flex items-center justify-between bg-[#0000007e] border-b-2 py-2 md:py-1 px-4 md:px-16 border-gray-600'>
                <span className='md:flex hidden md:flex-row items-center gap-x-4 gap-y-2 md:gap-y-0'>
                    <p className='text-gray-500 font-medium text-lg'>Follow us on</p>
                    <span className='flex items-center gap-x-4'>
                        <a href="https://www.instagram.com/bharat_startup_sankalan/" target="_blank" rel="noopener noreferrer">
                            <FiInstagram size={24} className="text-gray-500 text-base hover:text-gray-400" />
                        </a>
                        <a href="http://linkedin.com/company/bharat-startup-sankalan" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={24} className="text-gray-500 text-base hover:text-gray-400" />
                        </a>
                    </span>
                </span>

                <span className='flex justify-between w-full md:max-w-lg items-center gap-4 md:gap-10'>
                    <Link className='text-gray-500 font-medium text-lg cursor-pointer hover:underline' href={'/trending'}>Top 10 🔥 </Link>
                    <Link className='text-gray-500 font-medium text-lg cursor-pointer hover:underline' href={'/faq'}>FAQ</Link>
                    <Link className='text-gray-500 font-medium text-lg cursor-pointer hover:underline' href={'/feedback'}>Feedback/suggestions</Link>
                    <Link className='text-gray-500 font-medium text-lg cursor-pointer hover:underline' href={'/share'}>Share It</Link>
                    <Link className='text-gray-500 font-medium text-lg cursor-pointer hover:underline' href={'/about'}>About Us</Link>
                    <Link className='text-gray-500 font-medium text-lg cursor-pointer hover:underline' href="mailto:bharatstartupsankalan@gmail.com">Contact Us</Link>
                   
                </span>
            </div>
        </nav>
    )
}

export default Navbar
