import { poppins } from "@/src/config/font.config";
import { siteConfig } from "@/src/config/site.config";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Container from "../core/components/layouts/helpers/container";
import Footer from "../core/components/molecules/footer";
import Header from "../core/components/molecules/header";
import "../styles/globals.css";

export const metadata: Metadata = siteConfig.meta;

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="fr">
			<body className={`${poppins.variable}`}>
				<Container as="main">
					<Header />
					{children}
					<Footer />
				</Container>
			</body>
		</html>
	);
}
