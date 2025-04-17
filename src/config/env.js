import * as z from "zod";
import { formatEnvError } from "../shared/utils/format-env-error.js";

const createEnv = () => {
	const EnvSchema = z.object({
		server: z.object({
			NODE_ENV: z.enum(["development", "test", "production"]),
			API_URL: z.string().url(),
			APP_URL: z.string().optional().default("http://localhost:3000"),
		}),
		client: z.object({}),
	});

	const envVars = {
		server: {
			NODE_ENV: process.env.NODE_ENV,
			API_URL: process.env.API_URL,
			APP_URL: process.env.APP_URL,
		},
		client: {},
	};

	const parsedEnv = EnvSchema.safeParse(envVars);

	try {
		if (!parsedEnv.success) {
			formatEnvError(parsedEnv.error);
		}
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}

	return { EnvSchema, envJS: parsedEnv.data } ?? {};
};

export const { EnvSchema, envJS } = createEnv();
