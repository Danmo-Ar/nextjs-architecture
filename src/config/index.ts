// -- Start  : Transform JS variable to TS variable
import * as z from "zod";
import { EnvSchema, envJS } from "./env";

type Env = z.infer<typeof EnvSchema>;
export const $env = envJS as Env;

// -- End  : Transform JS variable to TS variable
// -- Exporting all things bellow

export * from "./site.config";
