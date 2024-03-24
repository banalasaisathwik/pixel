import type { Metadata } from 'next'

import Context from './components/context'
import Navbar from './components/NavBar'


interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
	const { children } = props

	return (
		<html lang='en'>
			<head>
				<link rel='icon' href='/favicon.ico' sizes='any' />
				<link rel='stylesheet' href='https://use.typekit.net/sqg3ceb.css' />
			</head>
			<body className='bg-[url("/bg.avif")] bg-cover bg-center w-full min-h-screen leading-[1.6em] font-light font-text-font text-lg'>
				<Context>
					<Navbar />
					{children}
				</Context>
			</body>
		</html>
	)
}
