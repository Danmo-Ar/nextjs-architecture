/**
 * use  : https://fontsource.org/fonts/roboto/install
 * the new way to handle font in our project
 */

// TODO : remove font config since we use fontsource

import { Poppins } from "next/font/google";

// Cette Polices est utilisée pour les examples : aller dans le fichier layout.tsx pour voir comment elle est utilisée

export const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	variable: "--font-poppins",
	preload: true,
});
