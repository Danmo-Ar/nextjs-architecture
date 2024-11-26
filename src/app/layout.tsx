import { siteConfig } from "@/src/config/site.config";
import type { Metadata } from "next";
import { ReactNode } from "react";

import "../styles/globals.css";

export const metadata: Metadata = siteConfig.meta;

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="fr">
			<body>
				<main>{children} </main>
			</body>
		</html>
	);
}
