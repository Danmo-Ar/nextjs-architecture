# Next.js Architecture Blank - Documentation Complète

## Table des Matières

1. [Introduction](#introduction)
2. [Philosophie du Projet](#philosophie-du-projet)
3. [Structure des Dossiers](#structure-des-dossiers)
4. [Fonctionnalités Clés](#fonctionnalités-clés)
5. [Flux de Développement](#flux-de-développement)
6. [Scripts et Commandes](#scripts-et-commandes)
7. [Conventions des commits](#scripts-et-commandes)
8. [Configuration](#configuration)
9. [Styles et Thèmes](#styles-et-thèmes)
10. [API et Gestion d'État](#api-et-gestion-détat)
11. [Tests](#tests)
12. [Bonnes Pratiques](#bonnes-pratiques)
13. [Déploiement](#déploiement)

---

## Introduction

Ce projet est un modèle Next.js modulaire et évolutif conçu pour simplifier le développement et l'intégration. Il intègre des outils modernes et des bonnes pratiques pour garantir la maintenabilité et la performance.

---

## Philosophie du Projet

-   **Modularité** : Les fonctionnalités sont isolées dans des modules autonomes.
-   **Scalabilité** : L'architecture supporte la croissance sans compromettre la maintenabilité.
-   **Expérience Développeur** : Des outils comme ESLint, Prettier et Husky sont intégrés pour garantir la qualité du code.
-   **Performance** : Optimisé pour le rendu côté serveur (SSR) et côté client (CSR).

---

## Structure des Dossiers

```
/nextjs-architecture-blank/
├── src/
│   ├── app/                   # App Router Next.js
│   │   ├── (home)/            # Module page d'accueil
│   │   ├── dashboard/         # Module tableau de bord
│   │   ├── layout.tsx         # Layout racine
│   │   ├── page.tsx           # Page racine
│   │   └── provider.tsx       # Fournisseurs globaux
│   │
│   ├── config/                # Fichiers de configuration
│   │   ├── env.js             # Validation des variables d'environnement
│   │   ├── site.config.ts     # Métadonnées du site
│   │   └── index.ts           # Point d'entrée config
│   │
│   ├── shared/                # Ressources partagées
│   │   ├── components/        # Composants réutilisables
│   │   │   ├── atoms/         # Éléments UI de base
│   │   │   ├── molecules/     # Éléments UI composés
│   │   │   ├── organisms/     # Sections UI complexes
│   │   │   └── layouts/       # Layouts de page
│   │   ├── hooks/             # Hooks React personnalisés
│   │   ├── utils/             # Fonctions utilitaires
│   │   ├── providers/         # Fournisseurs de contexte
│   │   └── store/             # Gestion d'état Zustand
│   │
│   ├── styles/                # Styles globaux
│   │   ├── globals.css        # Styles globaux TailwindCSS
│   │   └── colors.ts          # Définitions des couleurs du thème
│   │
│   └── features/              # Modules spécifiques aux fonctionnalités
│       ├── [feature]/         # Exemple de dossier fonctionnalité
│       │   ├── api/           # Appels API
│       │   ├── components/    # Composants spécifiques
│       │   ├── hooks/         # Hooks spécifiques
│       │   ├── types/         # Types TypeScript
│       │   └── utils/         # Utilitaires spécifiques
│
├── e2e/                       # Tests end-to-end
│   └── test/                  # Cas de test Playwright
│
├── public/                    # Assets statiques
├── .husky/                    # Hooks Git
├── .vscode/                   # Paramètres VSCode
├── .env                       # Variables d'environnement
├── package.json               # Métadonnées et scripts du projet
├── pnpm-lock.yaml             # Fichier de verrouillage des dépendances
├── tailwind.config.js         # Configuration TailwindCSS
└── tsconfig.json              # Configuration TypeScript
```

---

## Fonctionnalités Clés

1. **TypeScript** : Garantit la sécurité des types dans tout le projet.
2. **TailwindCSS** : Fournit un système de styles utilitaire.
3. **React Query** : Gère efficacement l'état des API.
4. **Zustand** : Gestion d'état globale légère.
5. **Husky et Lint-Staged** : Automatisent les vérifications de qualité du code lors des commits.
6. **Playwright** : Permet des tests end-to-end robustes.

---

## Flux de Développement

1. **Cloner le Dépôt** :

    ```bash
    git clone <repository-url>
    cd nextjs-architecture-blank
    pnpm install
    ```

2. **Lancer le Serveur de Développement** :

    ```bash
    pnpm dev
    ```

3. **Vérifications de Qualité du Code** :

    - Les hooks pre-commit lancent ESLint et Prettier.
    - Utilisez `pnpm lint` pour lancer manuellement le lint.

4. **Tests** :
    - Lancer les tests unitaires : `pnpm test`
    - Lancer les tests end-to-end : `pnpm e2e`

---

## Scripts et Commandes

-   `pnpm dev` : Démarrer le serveur de développement.
-   `pnpm build` : Construire le projet pour la production.
-   `pnpm start` : Démarrer le serveur de production.
-   `pnpm lint` : Lancer ESLint.
-   `pnpm test` : Lancer les tests unitaires.
-   `pnpm e2e` : Lancer les tests end-to-end.

---

## Conventions des commits

Dans le but d'avoir structurer nos commits et ainsi faciliter la lecture de l'historique, nous utilisons Commitizen pour formater nos messages de commit. Voici les types de commits que nous utilisons :

-   **feat** : Ajout d'une nouvelle fonctionnalité.
-   **fix** : Correction d'un bug.
-   **docs** : Modifications de la documentation.
-   **style** : Changements de style (formatage, espaces, etc.) sans impact sur le code.
-   **refactor** : Refactoring du code sans ajout de fonctionnalité ni correction de bug.
-   **perf** : Amélioration des performances.
-   **test** : Ajout ou correction de tests.
-   **build** : Changements dans le système de build ou les dépendances externes.
-   **ci** : Changements dans le pipeline CI/CD.
-   **chore** : Changements divers qui ne rentrent pas dans les autres catégories.

Dans ce projet pas besoin de comprendre tout le système de configuration qui nous permet d'aboutir à ce résultat. il suffit juste de faire :

```bash
pnpm commit
```

cette commande va vous poser une série de questions et à la fin, elle va générer un commit avec le bon format voici un exemple de ce à quoi ça ressemble :

    ? Select the type of change that you're committing : Obigatoire
    ? Select the scope of your change (optional) : Obigatoire , exemple : `ui`, `api`, `config` , `composant spécifique`
    ? Write a short, imperative tense description of the change (max 100 chars) : Obigatoire
    ? Provide a longer description of the change (optional). Use "|" to break new line : Optionnel
    Pour le reste des questions, vous pouvez laisser les valeurs par défaut

## Configuration

### Variables d'Environnement

Les variables d'environnement jouent un rôle crucial dans la configuration du projet. Voici une explication détaillée de leur gestion dans cette architecture :

-   **Fichiers `.env`** : Les variables d'environnement sont définies dans des fichiers `.env` spécifiques à chaque environnement (développement, production, etc.).

-   **Validation avec `zod`** : Le fichier `src/config/env.js` utilise la bibliothèque `zod` pour valider les variables d'environnement. Cela garantit que le projet démarre uniquement si toutes les variables nécessaires sont correctement définies et conformes aux attentes.

-   **Gestion des Erreurs** : En cas de variable manquante ou incorrecte, `env.js` affiche des messages d'erreur détaillés et colorés dans le terminal grâce à `chalk`. Les erreurs sont formatées avec précision pour faciliter le débogage.

-   **Exécution Automatique via Node.js** : Le fichier `env.js` est directement importé dans `next.config.js`. En raison du comportement de Node.js, les fonctions définies dans `env.js` sont exécutées dès leur importation. Cela permet de valider les variables d'environnement avant même le démarrage du projet.

-   **Intégration avec `next.config.js`** : Les variables validées dans `env.js` sont exposées à l'application Next.js via la configuration `env` dans `next.config.js`. Cela permet de les utiliser directement dans le code client et serveur.

-   **Utilisation Typée** : Pour accéder aux variables d'environnement de manière typée dans le projet, utilisez l'objet `$env` exposé par `env.js`. Cela garantit une utilisation cohérente et sécurisée des variables dans tout le projet.

```javascript
// Config File : src/config/env.js
import { $env } from '@/config';

export const API_URL = $env.server.API_URL; // Accès typé à la variable d'environnement
```

Cette approche assure une configuration robuste, sécurisée et facile à maintenir, tout en offrant une expérience de débogage améliorée.

### TailwindCSS

-   Configuré dans `tailwind.config.js`.
-   Thématisation dynamique via `colors.ts`.

---

## Styles et Thèmes

-   **Styles Globaux** : Définis dans `globals.css` avec TailwindCSS.
-   **Thèmes Dynamiques** : Gérés via `colors.ts` et Zustand.

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

## API et Gestion d'État

-   **React Query** : Gère les appels API et le cache.
-   **Zustand** : Gère l'état global avec une API simple.

---

## Tests

-   **Tests Unitaires** : Écrits avec Jest.
-   **Tests End-to-End** : Écrits avec Playwright.

---

## Bonnes Pratiques

1.  **Qualité du Code** :

    -   Utilisez ESLint et Prettier.
    -   Suivez les conventions de message de commit imposées par Commitizen.
    -   Utilisez Husky pour exécuter des vérifications avant les commits.

    ### Quelques bonnes pratiques de développement conforme à eslint :

    -   Utilisez des hooks personnalisés pour la logique réutilisable.
    -   Évitez les effets secondaires dans les composants le plus que possible.
    -   importer les types avec `import type {}` pour éviter d'importer des modules inutiles.
    -   Si une promesse est utilisée sans await, utilisez le mot clé `void` pour éviter les avertissements de linting ex :

    ```ts
    void fetchData();
    ```

2.  **Conception des Composants** :

    -   Utilisez les principes du design atomique pour les composants.

    ### Explications du design atomique

        - **Atomes** : Composants de base (ex : boutons, champs de texte).
        - **Molécules** : Combinaisons d'atomes (ex : formulaires).
        - **Organismes** : Sections complexes (ex : en-têtes, pieds de page).
        - **Layout** : Dispositions de page.
        - **Pages** : Dans le cas ou toutes la page doit être en client , il est important de l'extrait dans fichier afin de laisser son parent page.tsx en SSR.

3.  **Gestion d'État** :

    -   Utilisez React Query pour l'état des API.
    -   Utilisez Zustand pour l'état global.

4.  **Avoiding Provider Hell with provider tree** :
    -   Utilisez le fichier `src/app/provider.tsx` pour regrouper tous les providers nécessaires.
    -   Évitez de les imbriquer dans chaque module.
    -   Exemple :
    ```tsx
    import { ThemeProvider } from '@/shared/providers/themecolors.provider';
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    import type { PropsWithChildren } from 'react';
    import { buildProvidersTree } from '../shared/utils/build-providers-tree';
    const queryClient = new QueryClient();
    const ProviderTree = buildProvidersTree([
        [QueryClientProvider, { client: queryClient }],
        [ThemeProvider, {}]
    ]);
    ```

---

## Déploiement

-   Déployez sur Server Via docker file géré par la team devops.

---

## Conclusion

Cette documentation fournit une vue d'ensemble complète du projet. En suivant la structure et les pratiques décrites, les nouveaux développeurs peuvent rapidement s'intégrer et contribuer efficacement.
