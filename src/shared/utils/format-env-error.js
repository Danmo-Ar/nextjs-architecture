import chalk from "chalk";

const envErrors = {
	server: [],
	client: [],
};

export const formatEnvError = (error) => {
	const { issues } = error;
	issues.forEach((issue) => {
		envErrors[issue.path[0]].push(
			`${chalk.bold.blue(issue.path[1])} : ${chalk.bold.red(`${issue.message} ${chalk.bold.yellow(`( excepted :  ${issue.expected} )`)} `)} `,
		);
	});
	throw new Error(
		`${chalk.bold.red("Error: Invalid env provided")}\nThe following variables are missing or invalid ❌:
 ${Object.entries(envErrors)
		.map(([key, value]) =>
			value.length
				? `${key} : \n${value.map((item) => `- ${item}`).join("\n")}`
				: "",
		)
		.join("\n")}`,
	);
};
