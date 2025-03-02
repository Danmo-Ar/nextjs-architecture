import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'newsletter-color': '#FFD2C1',
                error: 'FC4F55',
                gray: {
                    DEFAULT: '#f2f2f2'
                }
            }
        }
    },
    plugins: []
};
export default config;
