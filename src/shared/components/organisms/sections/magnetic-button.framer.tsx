import { PropsWithChildren, useRef, useState } from 'react';

import { motion } from 'motion/react';

export default function MagenticButton({ children }: PropsWithChildren) {
    const ref = useRef<any>(null);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: any) => {
        const { clientX, clientY } = e;

        const { height, width, left, top } =
            ref.current.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);

        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX, y: middleY });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            style={{ position: 'relative' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{
                type: 'spring',
                stiffness: 200,
                damping: 13,
                mass: 0.2
            }}
        >
            {children}
        </motion.div>
    );
}
