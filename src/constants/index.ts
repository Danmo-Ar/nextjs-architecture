/**
 * Constants : Contient les constantes de l'application (URL des APIs,  enum etc...)
 */

import { $env } from '@/config/env';

export const API_URL = $env.server.API_URL;
export const NEXT_PUBLIC_API = $env.client.NEXT_PUBLIC_API;
export const IS_CLIENT = typeof window !== 'undefined';
