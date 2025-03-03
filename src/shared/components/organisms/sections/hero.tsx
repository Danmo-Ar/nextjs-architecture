'use client';
import nuage1 from '@/shared/assets/nuage1.png';
import nuage2 from '@/shared/assets/nuage2.png';
import nuage3 from '@/shared/assets/nuage3.png';
import nuage4 from '@/shared/assets/nuage4.png';
import { cn } from '@/shared/lib/utils';
import { motion, useAnimation, Variants } from 'motion/react';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import MagenticButton from './magnetic-button.framer';

const nuages: {
    positions: string;
    src: StaticImageData;
    size?: { width: number; height: number };
    duration: number;
}[] = [
    {
        positions: '-bottom-[60%]',
        src: nuage1,
        duration: 15
    },
    {
        positions: '-bottom-[60%]',
        src: nuage2,
        size: { width: 1419, height: 946 },
        duration: 9
    },
    {
        positions: '-bottom-[45%]',
        src: nuage3,
        size: { width: 1419, height: 946 },
        duration: 8
    },
    {
        positions: '-bottom-[65%]',
        src: nuage4,
        size: { width: 1419, height: 946 },
        duration: 5
    }
];
const DEFAULT_Y = 100;
const NotFromZero = [
    { x: -DEFAULT_Y, text: '<' },
    { y: DEFAULT_Y, text: 'Not' },
    { y: DEFAULT_Y, text: 'From' },
    { y: DEFAULT_Y, text: 'Zero' },
    { x: DEFAULT_Y, text: '/' },
    { x: DEFAULT_Y, text: '>' },
    { x: DEFAULT_Y, text: ';' }
];
const BuildAmazingThings = [
    { y: -DEFAULT_Y, text: 'Build' },
    { y: DEFAULT_Y, text: 'Amazing' },
    { y: DEFAULT_Y, text: 'Things' }
];

/**
 * Framer Animation
 *
 */

const parent: Variants = {
    animate: { transition: { staggerChildren: 0.4 } }
};

const showText = {
    initial: ({ x, y }: { x: number; y: number }) => ({
        ...(x ? { x, opacity: 0 } : { y }),
        filter: 'blur(5px) '
    }),
    animate: {
        y: 0,
        x: 0,
        opacity: 1,
        filter: 'blur(0) ',
        transition: { type: 'spring', duration: 0.8, siffness: 300 }
    }
};

const moveClouds: Variants = {
    initial: { x: '-100%' },
    animate: {
        x: '100%'
    }
};

const Hero = () => {
    const buildAmazingThingsAnimation = useAnimation();
    const notFromZeroAnimation = useAnimation();

    const [shouldAnimateClouds, setShouldAnimateClouds] = useState(false);
    useEffect(() => {
        (async () => {
            await buildAmazingThingsAnimation.start('animate');
            await notFromZeroAnimation.start('animate');
            setShouldAnimateClouds(true);
        })();
    }, [buildAmazingThingsAnimation, notFromZeroAnimation]);

    return (
        <section className="bg-tweak hero-bg h-screen items-center   ">
            <header>
                <p className="absolute left-32 top-5 tracking-wider text-white">
                    We are everest.
                </p>

                <p className="absolute right-32 top-5 tracking-wider text-white">
                    &copy; Build with 💖 by core team.
                </p>
            </header>

            <div className="relative z-10 pt-12 text-center uppercase leading-[1.2]  text-white ">
                {/* Not From Zero Text */}
                <motion.div
                    initial="initial"
                    animate={notFromZeroAnimation}
                    variants={parent}
                >
                    <p className="overflow-hidden text-[5rem] font-extralight capitalize">
                        {NotFromZero.map((text, index) => (
                            <>
                                <motion.span
                                    key={index}
                                    variants={showText}
                                    custom={{ x: text.x, y: text.y }}
                                    className="inline-block"
                                >
                                    {text.text}
                                </motion.span>{' '}
                            </>
                        ))}
                    </p>
                </motion.div>

                {/* Build Amazing Things */}
                <motion.div
                    initial="initial"
                    animate={buildAmazingThingsAnimation}
                    variants={parent}
                >
                    <h1 className="overflow-hidden text-[9rem] font-normal capitalize">
                        {BuildAmazingThings.map((text, index) => (
                            <>
                                <motion.span
                                    key={index}
                                    variants={showText}
                                    custom={{ y: text.y }}
                                    className="inline-block"
                                >
                                    {text.text}
                                </motion.span>{' '}
                            </>
                        ))}
                    </h1>
                </motion.div>

                {/* Vertical Line */}
                <div className="mx-auto mt-12 h-48 w-0.5  bg-[#FCFDEC]" />
                {/* Circle Button Line */}

                <div className="mt-12 flex justify-center">
                    <MagenticButton>
                        <button className="flex aspect-square items-center justify-center rounded-full border-2 border-[#FCFDEC] p-16 ">
                            <span className="text-[2rem]  tracking-wider text-[#FCFDEC]">
                                DOCS
                            </span>
                        </button>
                    </MagenticButton>
                </div>
            </div>
            <Image
                className="absolute -bottom-20 w-full"
                src={'/assets/montain.png'}
                alt="montain"
                width={1920}
                height={1080}
                priority
            />

            {nuages.map((nuage, index) => (
                <motion.img
                    key={index}
                    initial="initial"
                    animate={shouldAnimateClouds ? 'animate' : 'initial'}
                    custom={nuage.duration}
                    variants={moveClouds}
                    transition={{
                        duration: 10 + nuage.duration, // Duration of each loop
                        repeat: Infinity, // Repeat forever
                        repeatType: 'loop', // Looping back to the start after the animation ends
                        ease: 'linear' // Smooth linear movement
                    }}
                    className={cn('absolute  w-full', nuage.positions)}
                    width={nuage.size?.width}
                    height={nuage.size?.height}
                    src={'/assets/nuage' + (index + 1) + '.png'}
                    alt={`nuage ${index}`}
                />
            ))}
        </section>
    );
};

export default Hero;
