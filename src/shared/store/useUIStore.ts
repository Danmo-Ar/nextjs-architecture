import { Theme } from '@/styles/colors';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface UISlice {
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const createUISlice = (set: any): UISlice => ({
    theme: 'main-theme',
    setTheme: (theme: Theme) => set({ theme }),
    isSidebarCollapsed: false,
    toggleSidebar: () =>
        set((state: UISlice) => ({
            isSidebarCollapsed: !state.isSidebarCollapsed
        }))
});

interface UIStoreState extends UISlice {}

export const useUIStore = create<UIStoreState>()(
    devtools(
        persist(
            (set) => ({
                ...createUISlice(set)
            }),
            {
                name: 'ui-storage',
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({
                    theme: state.theme
                    // Don't persist notifications or sidebar state
                })
            }
        ),
        { name: 'ui-store' }
    )
);

export const themeStore = useUIStore.getState().theme;
