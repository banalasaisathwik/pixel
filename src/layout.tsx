import Head from 'next/head'
import Context from './components/context'
import Navbar from './components/NavBar'


interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
	const { children } = props
	
	return (
		<html lang='en'>
			<Head>
				<link rel='icon' href='/logo.png' sizes='any' />
				<link rel='stylesheet' href='https://use.typekit.net/sqg3ceb.css' />
			</Head>
			<body className=' w-full min-h-screen leading-[1.6em] font-light font-text-font text-lg'>
				
				<Context>
					<Navbar />
					{children}
				</Context>
			</body>
		</html>
	)
}
