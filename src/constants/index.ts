/**
 * Constants : Contient les constantes de l'application (URL des APIs,  enum etc...)
 */

import { $env } from '@/config/env';
import { rmSlashEndUrl } from '@/shared/lib/rm-slash-api-url';

export const API_URL = rmSlashEndUrl($env.client.NEXT_PUBLIC_API_URL);
export const IS_CLIENT = typeof window !== 'undefined';
