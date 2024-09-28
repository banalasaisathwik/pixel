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
		>
			<Link className='text-center z-50 flex items-center gap-x-2' href='/'>


				<Image className=' w-12 h-12 md:w-16  md:h-16' src="/logo.png" alt="India Map Logo" width={300} height={300} />


				<span className='sr-only'> Logo </span>
				<h1 className=' text-white leading-tight text-8xl md:text-3xl font-bold z-50 '>
					Pixel-Preneur
				</h1>
			</Link>


		</motion.div>
	)
}

export default Logo
