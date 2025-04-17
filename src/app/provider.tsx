'use client';
/**
 * Ce fichier contient tout les providers qui permettent d'envelopper les composants de notre application
 * le composant ainsi obtenu peut être marqué en useClient et importer dans le app/layout qui lui reste en SSR
 */

import { ThemeProvider } from '@/shared/providers/themecolors.provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import { buildProvidersTree } from '../shared/utils/build-providers-tree';

const queryClient = new QueryClient();

const ProviderTree = buildProvidersTree([
    [QueryClientProvider, { client: queryClient }],
    [ThemeProvider, {}]
]);

export const Provider = ({ children }: PropsWithChildren) => {
    return (
        <ProviderTree>
            {children}
            <Toaster position="top-center" richColors />
        </ProviderTree>
    );
};
