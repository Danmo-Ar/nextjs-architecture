import Link from "next/link";
import { menus } from "../../data/menu.data";

import { CartIcon } from "../atoms/icons/cart-icon";
import { HeartIcon } from "../atoms/icons/heart-icon";
import { SearchIcon } from "../atoms/icons/search-icon";
import Logo from "../atoms/logo";
import Flex from "../layouts/helpers/flex";

const Header = () => {
	return (
		<header className="py-20">
			<Flex
				as="menu"
				className="text-center"
				settings={{
					align: "center",
					justify: "between",
					shouldTakeSameSpace: true,
				}}
			>
				<Flex
					as="nav"
					settings={{ shouldTakeSameSpace: false, spacing: "gap-12" }}
				>
					{menus.map((menu) => (
						<Link
							className="link text-[1.6rem]"
							key={menu.label}
							href={menu.href}
						>
							{menu.label}
						</Link>
					))}
				</Flex>

				<Logo />

				<Flex
					as="span"
					settings={{
						shouldTakeSameSpace: false,
						spacing: "gap-12",
						align: "center",
						justify: "end",
					}}
				>
					<span role="button" className="text-[1.6rem]">
						<SearchIcon />
					</span>
					<span role="button" className="text-[1.6rem]">
						<HeartIcon />
					</span>

					<span role="button" className="relative text-[1.6rem]">
						<CartIcon />

						<Flex
							as="span"
							settings={{
								align: "center",
								justify: "center",
							}}
							className="absolute -right-4 -top-2 size-8 rounded-full bg-black p-4 text-[1.1rem] text-white"
						>
							2
						</Flex>
					</span>
				</Flex>
			</Flex>
		</header>
	);
};

export default Header;
