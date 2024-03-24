'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { view } from '../utils/animations'
import Image from 'next/image'

interface LogoProps {
	fillWhite: boolean
}

const Logo = (props: LogoProps) => {
	const { fillWhite } = props

	return (
		<motion.div
			variants={view}
			initial='initial'
			whileInView='animate'
			className=''>
			<Link className='text-center' href='/'>
				<span className='sr-only'> Logo </span>
				<h1 className='font-Ultra text-white  mt-10 text-[8vw] leading-[8vw] lg:leading-[3vw] lg:text-[3.5vw]'>Bharat ki startup sankalan</h1>
			</Link>
		</motion.div>
	)
}

export default Logo
