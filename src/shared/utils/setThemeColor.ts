import type { ColorShade, Scheme } from '@/styles/colors';

export const setThemeColor = (theme: ColorShade, color: Scheme) => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([shade, value]) => {
        root.style.setProperty(`--${color}-${shade}`, value);
        // console.table({ [`--${color}-${shade}`]: value });
    });
};
