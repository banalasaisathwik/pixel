'use client'

import { useNavbarMenuToggle, useNavbarVisibility } from '../hooks'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { view } from '../utils/animations'
import NavMenuButton from './NavMenuButton'
import NavMobileMenu from './NavMobileMenu'
import Logo from './Logo'

const Navbar = () => {
    const { navOpen, changeNavMenu, toggleNavMenu } = useNavbarMenuToggle()
    const {  textWhite, values } = useNavbarVisibility()
    const isFillWhite = textWhite && values!.isTextWhite && !navOpen;
 


    return (
        <nav
            className={`block w-full h-auto md:h-16 sm:h-auto z-[9999] ${navOpen
                    ? 'fixed top-0 left-0 bottom-0 z-[999999]  bg-orange-500'
                    : 'absolute'
                } md:bottom-auto 
                font-heading-narrow`}>
            <div className='w-full px-[100px] md:flex justify-center items-center md:h-[100px] xl:h-[120px]'>
                {/* Navigation desktop - left */}
                <motion.ul
                    variants={view}
                    initial='initial'
                    whileInView='animate'
                    className='w-full mx-auto pr-[50px] text-left hidden md:flex flex-row flex-nowrap items-baseline'>
                   
                    <li className='mx-auto text-white font-semibold font-sai align-top text-2xl md:text-3xl leading-[1.2em] md:inline-block uppercase'>
                        
                        <Image src="/logo.png" alt="India Map Logo" width={60} height={50} />
                    </li>

                    <li className='mr-auto text-white font-semibold font-sai align-top text-2xl md:text-3xl leading-[1.2em] md:inline-block uppercase'>
                        <Link href='/about'>About</Link>
                    </li>

                </motion.ul>

                <Logo fillWhite={isFillWhite} />

                {/* Navigation desktop - right */}
                <motion.ul
                    variants={view}
                    initial='initial'
                    whileInView='animate'
                    className='w-full text-left md:text-right mx-auto pl-[50px] hidden md:flex md:flex-row md:flex-nowrap md:justify-end md:items-baseline'>
                 
                    <li className="text-2xl text-white md:text-3xl mx-auto font-semibold font-sai align-top md:inline-block uppercase">
                        <Link
                         href="/buyer/info"
                        >Buy block </Link>
                    </li>
                </motion.ul>

                {/* Mobile Navigation Menu */}
                {navOpen && <NavMobileMenu closeMenu={changeNavMenu} />}

                {/* Hamburger Menu Button */}
                <NavMenuButton isNavOpen={navOpen} toggleNavMenu={toggleNavMenu} />



            </div>
        </nav>
    )
}

export default Navbar
