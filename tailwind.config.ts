import type { Config } from 'tailwindcss';
import { colors, uniqueColor } from './src/styles/colors';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'newsletter-color': '#FFD2C1',
                ...colors['orange-theme'],
                ...uniqueColor
            }
        }
    },
    plugins: []
};
export default config;
