


interface NavMenuButtonProps {
	isNavOpen: boolean
	toggleNavMenu: () => void
}

const NavMenuButton = (props: NavMenuButtonProps) => {
	const { isNavOpen, toggleNavMenu } = props
	

	return (
		<button
			type='button'
			onClick={toggleNavMenu}

			className='rounded px-[10px] bg-black md:hidden absolute top-14 right-4 z-50 cursor-pointer w-14 h-14 transition-colors duration-500 ease-in-out'>
			<span className='sr-only'> Menu </span>
			<div className='w-full flex justify-center h-auto  align-middle'>
				{
					isNavOpen ?
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-white">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
						: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-white">
							<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						</svg>
				}




			</div>
		</button>
	)
}

export default NavMenuButton
