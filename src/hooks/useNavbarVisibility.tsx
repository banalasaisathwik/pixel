import { useMotionValueEvent, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { context } from '../components/context';

const useNavbarVisibility = () => {
	const [scrollHeight, setScrollHeight] = useState<number>(0);
	const [showNavbar, setShowNavbar] = useState<boolean>(true);
	const [textWhite, setTextWhite] = useState<boolean>(true);
	const { scrollY } = useScroll();
	const pathName = usePathname();
	const values = useContext(context);

	useMotionValueEvent(scrollY, 'change', (latest) => {
		setShowNavbar(scrollHeight > latest);
		setScrollHeight(latest);
	});

	useLayoutEffect(() => {
		const scrollHandler = () => {
			// Initialize all offsetTop variables with a default value of 0
			let aboutOffsetTop = 0;
			let foodsOffsetTop = 0;
			let intriguedOffsetTop = 0;

			// Safely attempt to update offsetTop values if elements are found
			const updateOffsetTop = (selector: string) => {
				const element = document.querySelector(selector);
				if (element instanceof HTMLElement) {
					return element.offsetTop;
				}
				return 0;
			};


			aboutOffsetTop = updateOffsetTop('#about');
			foodsOffsetTop = updateOffsetTop('#foods');
			intriguedOffsetTop = updateOffsetTop('#intrigued');

			// Logic to update textWhite based on scrollHeight and section offsets
			if (pathName === '/') {
				setTextWhite(scrollHeight < aboutOffsetTop ||
					(scrollHeight >= foodsOffsetTop && scrollHeight < intriguedOffsetTop - window.innerHeight / 4));
			} else {
				setTextWhite(['/contact', '/privacy-policy', '/products'].includes(pathName));
			}
		};

		window.addEventListener('scroll', scrollHandler);

		return () => window.removeEventListener('scroll', scrollHandler);
	}, [scrollHeight, pathName]);

	useEffect(() => {
		if (pathName !== '/products') values?.setIsTextWhite(true);
	}, [pathName, values]);

	return { showNavbar, textWhite, values };
};

export default useNavbarVisibility;
