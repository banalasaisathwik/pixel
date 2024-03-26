'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { view } from '../utils/animations'
import Image from 'next/image'

interface LogoProps {
	fillWhite: boolean
}

const Logo = (props: LogoProps) => {

	return (
		<motion.div
			variants={view}
			initial='initial'
			whileInView='animate'
			className=' relative'>
			<Link className='text-center z-50' href='/'>

				<span className='sr-only'> Logo </span>
				<h1 className='font-Ultra text-white  mt-10 text-[8vw] z-50 leading-[8vw] lg:leading-[3vw] lg:text-[3.5vw]'>Bharat ki startup sankalan</h1>

			</Link>
			<Image className='absolute top-4 lg:left-1/2 lg:translate-x-[-50%] left-[-10%] translate-x-[-100%] -z-10 w-16 lg:w-1/2' src="/logo.png" alt="India Map Logo" width={1000} height={1000} />

		</motion.div>
	)
}

export default Logo
