# Implémenter un Thème de Couleurs Standardisé avec TailwindCSS

## Vue d'ensemble

Le système de thème de couleurs dans ce projet est conçu pour fournir une méthode modulaire et évolutive de gestion des couleurs du système de design. Il permet un changement de thème facile et garantit la cohérence dans toute l'application.

### Composants Clés

1. **`colors.ts`** :

    - Définit l'objet `ThemeColor`, qui contient plusieurs thèmes (par exemple, `main-theme`, `blue-theme`).
    - Chaque thème inclut un `ColorScheme` avec des nuances prédéfinies (`50`, `100`, ..., `900`) pour les couleurs `primary`, `secondary` et `accent`.
    - Exporte `colorsConfigFn` pour générer des variables compatibles avec TailwindCSS pour un thème dynamique.

2. **`setThemeColor.ts`** :

    - Applique dynamiquement les couleurs du thème sélectionné aux variables CSS en utilisant `document.documentElement.style.setProperty`.
    - Parcourt les entrées `ColorShade` du thème sélectionné et met à jour les variables `--<color>-<shade>`.

3. **Intégration avec TailwindCSS** :

    - Le fichier `tailwind.config.ts` utilise `colorsConfigFn` pour mapper les couleurs du thème aux classes TailwindCSS.
    - Exemple : `bg-primary-500` est mappé à `var(--primary-500)`.

4. **Changement de Thème** :
    - Le composant `ThemeProvider` dans `themecolors.provider.tsx` :
        - Récupère le thème actuel depuis le store Zustand `useUIStore`.
        - Applique les couleurs du thème en utilisant `setThemeColor`.
        - Assure que la page est visible uniquement après l'application du thème pour éviter un flash de contenu non stylé (TODO: cette partie devra être optimisé).

### Comment Ajouter un Nouveau Thème

1. Ajoutez un nouveau thème à l'objet `colors` dans `colors.ts`.
2. Mettez à jour le type `Theme` pour inclure la clé du nouveau thème.
3. TailwindCSS détectera automatiquement le nouveau thème via `colorsConfigFn`.

---

# Configuration de React Query

## Vue d'ensemble

React Query est configuré dans ce projet pour gérer efficacement les interactions avec l'API. Il fournit la mise en cache, les mises à jour en arrière-plan et la gestion des erreurs par défaut.

### Composants Clés

1. **`react-query.ts`** :

    - Définit l'objet `queryConfig` pour définir les paramètres globaux des requêtes :
        - `refetchOnWindowFocus: false` : Empêche le rafraîchissement lors du retour du focus sur la fenêtre.
        - `retry: false` : Désactive les tentatives automatiques en cas d'échec.
        - `staleTime: 1000 * 30` : Définit une durée de 30 secondes pour que les données mises en cache deviennent obsolètes.

2. **Types Utilitaires** :
    - `ApiFnReturnType` : Extrait le type de retour d'une fonction API.
    - `QueryConfig` : Fournit une méthode typée pour configurer les requêtes.
    - `MutationConfig` : Simplifie la configuration des mutations avec une sécurité de type.

### Comment Utiliser

-   **Requêtes** :
    Utilisez l'objet `queryConfig` pour appliquer des paramètres globaux. Remplacez ces paramètres dans des requêtes individuelles si nécessaire.

    ```ts
    import { useQuery } from '@tanstack/react-query';

    const { data, error } = useQuery(['key'], fetchData, {
        staleTime: 60000 // Remplace la valeur globale de staleTime
    });
    ```

-   **Mutations** :
    Utilisez `MutationConfig` pour définir les options de mutation.

    ```ts
    import { useMutation } from '@tanstack/react-query';

    const mutation = useMutation(mutateData, {
        onSuccess: () => {
            // Gérer le succès
        }
    });
    ```

### Avantages

-   Configuration centralisée pour un comportement cohérent.
-   Sécurité de type pour les interactions avec l'API.
-   Amélioration des performances grâce à la mise en cache et aux mises à jour en arrière-plan.

---
