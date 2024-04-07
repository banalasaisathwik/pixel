import { useEffect, useState } from 'react'

const useNavbarMenuToggle = () => {
	const [navOpen, setNavOpen] = useState<boolean>(false);

	useEffect(() => {
		let timeoutId: number | null = null;

		const resizeListener = () => {
			// Clear the timeout if it's already set
			if (timeoutId !== null) clearTimeout(timeoutId);

			// Set a new timeout
			timeoutId = window.setTimeout(() => {
				if (window.innerWidth >= 768) setNavOpen(false);
			}, 100); // 100ms debounce time
		};

		window.addEventListener('resize', resizeListener);

		return () => {
			window.removeEventListener('resize', resizeListener);
			// Also clear the timeout when the component unmounts
			if (timeoutId !== null) clearTimeout(timeoutId);
		};
	}, []);

	const toggleNavMenu = () => setNavOpen((prev) => !prev);
	const changeNavMenu = (status: boolean) => setNavOpen(status);

	return {
		navOpen,
		toggleNavMenu,
		changeNavMenu,
	};
};

export default useNavbarMenuToggle;
