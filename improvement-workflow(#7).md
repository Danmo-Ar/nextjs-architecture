# Configuration de Storybook

## 1. Installation de Storybook

```bash
pnpx storybook init
```

Après cette commande, Storybook génère un dossier ".storybook" dans lequel il y a deux fichiers :

-   **main.ts** qui contient les fichiers de configuration de Storybook.
    -   stories : définit les configurations pour les points de terminaison qui devront être pris en compte par Storybook.
    -   addons : la liste des addons :
        -   @chromatic : pour les tests de régression visuelle.
        -   themes : pour supporter les différents changements de thème.
        -   a11y : pour les tests d'accessibilité.
-   **preview.ts** : contient tous les paramètres permettant de modifier l'interface de Storybook comme la police, la couleur, etc.

## 2. Lancer Storybook

```bash
pnpm run storybook
```

## 3. Écrire une première story

Les stories que nous écrivons doivent être pertinentes, des éléments de notre composant qui représentent un caractère testable.

> Voici une liste de packages intéressants pour faciliter certains aspects de la construction d'un composant :
>
> -   **cva** : permet, avec TailwindCSS, de créer des composants ayant des variantes de style augmentant ainsi la réutilisabilité de notre composant.
> -   **clsx** : permet d'appliquer sous forme d'objet les classes dynamiques.

### 3.1. Créer dans le dossier du composant une story

Exemple : Pour un composant Button, créer le fichier `button.stories.tsx`.

### 3.2. Importer les types (Meta et StoryObj) ainsi que le composant de la story

```tsx
import type { Meta, StoryObj } from '@storybook/react';
```

### 3.3. Créer l'objet meta qui permet de décrire notre story : nom de la story, le composant utilisé, etc.

```tsx
const meta = {
    title: 'Button',
    component: Button
} satisfies Meta<typeof Button>;

export default meta;
```

### 3.4. Créer une variante

Nos variantes dépendent de la logique de notre composant.

```tsx
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
```

### Component Story Format

Ce format, beaucoup plus présent dans la version 8, permet de définir des props par défaut en type objet.

```tsx
export const Secondary: Story = {
    args: {
        children: 'Secondary'
    }
};

// Alternative
export const Secondary: Story = {
    render: () => <Button>Secondary</Button>
};
```

### Partager les props des composants entre toutes les stories

Souvent, on voudrait que nos stories aient les mêmes props par défaut. Dans ce cas, l'objet `args` doit être défini dans l'objet meta. Si une story ne définit pas d'arguments, elle prendra automatiquement les valeurs définies dans l'objet meta.

```tsx
const meta = {
    title: 'Button',
    component: Button,
    args: {
        children: 'Button'
    }
} satisfies Meta;
```

### Ajouter les stories des variantes pour nos boutons

```tsx
export const Primary: Story = {
    args: {
        variant: 'primary'
    }
};

export const Secondary: Story = {
    args: {
        children: 'Secondary',
        variant: 'secondary'
    }
};
```

> _Quand nous créons un composant, il n'est pas forcément nécessaire de lui passer l'attribut `className`. Il faut garder à l'esprit que tout dépend de ce que nous voulons faire._
