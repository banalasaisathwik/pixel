import { useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { context } from '../components/context';

const useNavbarVisibility = () => {
	const [scrollHeight, setScrollHeight] = useState(0);
	const [showNavbar, setShowNavbar] = useState(true);
	const [textWhite, setTextWhite] = useState(true);
	const { scrollY } = useScroll();
	const pathName = usePathname();
	const values = useContext(context);

	// Update to use useEffect for compatibility with SSR
	useEffect(() => {
		const unsubscribe = scrollY.onChange((latest) => {
			setShowNavbar(scrollHeight > latest);
			setScrollHeight(latest);
		});
		return unsubscribe;
	}, [scrollY, scrollHeight]);

	useEffect(() => {
		const scrollHandler = () => {
			// Only run this code on the client side
			if (typeof window === 'undefined') return;

			// Logic to update textWhite based on scrollHeight and section offsets
			const updateTextWhite = () => {
				const aboutElement = document.querySelector('#about');
				const aboutOffsetTop = aboutElement instanceof HTMLElement ? aboutElement.offsetTop : 0;

				const foodsElement = document.querySelector('#foods');
				const foodsOffsetTop = foodsElement instanceof HTMLElement ? foodsElement.offsetTop : 0;

				const intriguedElement = document.querySelector('#intrigued');
				const intriguedOffsetTop = intriguedElement instanceof HTMLElement ? intriguedElement.offsetTop : 0;


				if (pathName === '/') {
					setTextWhite(
						scrollHeight < aboutOffsetTop ||
						(scrollHeight >= foodsOffsetTop && scrollHeight < intriguedOffsetTop - window.innerHeight / 4)
					);
				} else {
					setTextWhite(['/contact', '/privacy-policy', '/products'].includes(pathName));
				}
			};

			updateTextWhite();
		};

		// Ensure this effect runs once at mount to set initial state based on current scroll position
		scrollHandler();

		window.addEventListener('scroll', scrollHandler);
		return () => window.removeEventListener('scroll', scrollHandler);
	}, [scrollHeight, pathName]);

	useEffect(() => {
		if (pathName !== '/products') values?.setIsTextWhite(true);
	}, [pathName, values]);

	return { showNavbar, textWhite, values };
};

export default useNavbarVisibility;
