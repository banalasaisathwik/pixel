import { useEffect, useRef } from "react";

// Define the structure of a Circle for TypeScript
interface Circle {
    x: number;
    y: number;
}

export default function Cursor() {
    const numCircles = 20; // Number of circles
    const coords = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const circles = useRef<Circle[]>(Array.from({ length: numCircles }, () => ({ x: 0, y: 0 })));
    const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const colors = [
        "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d",
        "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d",
        "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060",
        "#680060", "#60005f", "#48005f", "#3d005e"
    ];

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            coords.current.x = e.clientX;
            coords.current.y = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const animateCircles = () => {
            const x = coords.current.x;
            const y = coords.current.y;

            circles.current.forEach((circle, index) => {
                // Calculate the index of the next circle
                // const nextIndex = (index + 1) % numCircles; // This will wrap around to the start
                // const nextCircle = circles.current[nextIndex];

                // Easing effect for smoother movement
                circle.x += (x - circle.x) * 0.3; // Move towards mouse position
                circle.y += (y - circle.y) * 0.3; // Move towards mouse position

                // Update the DOM element's position directly
                const currentCircleRef = circleRefs.current[index];
                if (currentCircleRef) {
                    currentCircleRef.style.left = `${circle.x - 12}px`; // Center the circle
                    currentCircleRef.style.top = `${circle.y - 12}px`; // Center the circle
                    currentCircleRef.style.transform = `scale(${(numCircles - index) / numCircles})`;
                }
            });

            requestAnimationFrame(animateCircles); // Call the function again for the next animation frame
        };

        animateCircles(); // Start the animation
    }, []);

    return (
        <>
            {Array.from({ length: numCircles }).map((_, index) => (
                <div
                    key={index}
                    className="circle"
                    style={{ backgroundColor: colors[index % colors.length] }}
                    ref={(el) => (circleRefs.current[index] = el)} // Store the ref
                />
            ))}
        </>
    );
}
