import { siteConfig } from '@/config';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';

interface LogoProps extends HTMLAttributes<HTMLImageElement> {
    width?: number;
    height?: number;
}

const Logo = ({ width, height }: LogoProps) => {
    return (
        <h2 style={{ width, height }}>
            <Link href={'/'} className="text-[2.4rem] sm:text-[3.5rem]">
                {siteConfig.meta.title}
            </Link>
        </h2>
    );
};

export default Logo;
