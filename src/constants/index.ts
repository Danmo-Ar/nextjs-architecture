/**
 * Constants : Contient les constantes de l'application (URL des APIs,  enum etc...)
 */

import { $env } from '@/config';

export const API_URL = $env.server.API_URL;
export const IS_CLIENT = typeof window !== 'undefined';
