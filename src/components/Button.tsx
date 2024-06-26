'use client'

import { type AnimationControls, motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { marquee } from '../utils/animations'


interface ButtonProps {
	title: string
	link?: string
	isSmall?: boolean
	background?: string
}

interface ButtonTitleProps {
	title: string
	isSmall?: boolean
	controls: AnimationControls
}

const ButtonTitle = (props: ButtonTitleProps) => {
	const { title, isSmall, controls } = props
	return (
		<motion.span
			variants={marquee}
			initial='initial'
			animate={controls}
			className={`inline-block text-center px-[0.7em] pt-[0.2em] pb-[0.6em] ${
				isSmall ? 'text-base md:text-lg' : 'text-[20px] md:text-[24px]'
			}`}>
			{title}
		</motion.span>
	)
}

const Button = (props: ButtonProps) => {
	const { title, link, isSmall } = props
	const controls = useAnimation()


	return (
		<Link
			
			href={link ? link : '/'}
			
			className={`relative group font-heading-narrow font-extrabold text-center ${
				isSmall ? 'text-base md:text-lg' : 'text-xl md:text-2xl'
			}  px-[0.7em] pt-[0.2em] pb-[0.2em] tracking-[0.01em] uppercase rounded`}>
			<span className='opacity-0'> {title} </span>
			<span className='absolute top-0 left-0 bottom-0 w-full overflow-hidden pointer-events-none whitespace-nowrap'>
				<ButtonTitle title={title} isSmall={isSmall} controls={controls} />
				<ButtonTitle title={title} isSmall={isSmall} controls={controls} />
			</span>
		</Link>
	)
}

export default Button
