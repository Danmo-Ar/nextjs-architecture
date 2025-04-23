/**
 * Constants : Contient les constantes de l'application (URL des APIs,  enum etc...)
 */

import { $env } from '@/config/env';

export const API_URL = $env.client.NEXT_PUBLIC_API_URL;
export const IS_CLIENT = typeof window !== 'undefined';
