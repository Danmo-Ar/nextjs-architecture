import Link from "next/link";
import { HTMLAttributes } from "react";

interface LogoProps extends HTMLAttributes<HTMLImageElement> {
	width?: number;
	height?: number;
	colored?: boolean;
}

const Logo = ({
	width = 248,
	height = 248,
	colored = false,
	...props
}: LogoProps) => {
	return (
		<h2>
			<Link href={"/"} className="text-[2.4rem] sm:text-[3.5rem]">
				EDNA SHOP
			</Link>
		</h2>
	);
};

export default Logo;
