'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { slideDownView, slideDownViewTransition } from '../utils/animations'

interface NavMobileMenuProps {
	closeMenu: (status: boolean) => void
}

const NavMobileMenu = (props: NavMobileMenuProps) => {
	const { closeMenu } = props
	const router = useRouter()

	const handleClose = (link: string) => {
		closeMenu(false)
		router.push(link)
	}
	const closeMenuOnClickingProductLink = () => handleClose('/buyer/info')
	const closeMenuOnClickingContactLink = () => handleClose('/about')

	return (
		<ul className='flex gap-6 md:hidden w-full text-white h-full z-30 mx-auto py-[80px] md:py-[100px] xl:py-[120px] flex-col bg-black justify-center absolute top-0 left-0 right-0 bottom-0 overflow-auto text-center '>
			<li
				
				className='w-full text-[8vw]  leading-[0.9em] font-heading-narrow font-[900] uppercase text-[var(--black)]'>
				<Link onClick={closeMenuOnClickingProductLink} href='/about'>
					About
				</Link>
			</li>
			<li
			
				className='w-full text-[8vw] relative leading-[0.9em] font-heading-narrow font-[900] uppercase text-[var(--black)]'>
				<Link onClick={closeMenuOnClickingContactLink} href='/buyer/info'>
					Buy
				</Link>
			</li>
		</ul>
	)
}

export default NavMobileMenu
