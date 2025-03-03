import type { Config } from "tailwindcss";
import { colorsConfig, uniqueColor } from "./src/styles/colors";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "newsletter-color": "#FFD2C1",
                ...colorsConfig,
                ...uniqueColor,
            },
        },
    },
    plugins: [],
};
export default config;
