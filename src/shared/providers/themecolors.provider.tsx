'use client';
import { colors, Scheme } from '@/styles/colors';
import { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { setThemeColor } from '../lib/helpers/setThemeColor';
import { useUIStore } from '../store/useUIStore';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const { theme } = useUIStore();
    const [mounted, setMounted] = useState(false);

    useLayoutEffect(() => {
        const selectedThemeColor = colors[theme];
        for (const key in selectedThemeColor) {
            const color = key as Scheme;
            setThemeColor(selectedThemeColor[color], color);
        }
        setMounted(true);
    }, [theme]);

    // TODO : Find a better approach  to show the page with proper theme on start
    return <div className={mounted ? '' : 'invisible'}>{children}</div>;
};
