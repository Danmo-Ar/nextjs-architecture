import { Button } from "../../atoms/button";
import Flex from "../../layouts/helpers/flex";

const Hero = () => {
	return (
		<Flex
			as="section"
			className="min-h-[60.2rem] bg-gray-300"
			settings={{
				shouldTakeSameSpace: false,
				isColumn: true,
				align: "center",
				justify: "center",
				spacing: "gap-[8rem]",
			}}
		>
			<h1 className="text-white">Slogan de Edna</h1>

			<Button>Acheter</Button>
		</Flex>
	);
};

export default Hero;
