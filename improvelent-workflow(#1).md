# Installer & Configurer Husky , Commitlint,Commitizen et LintStaged (#1)

## Installer Husky

Pourquoi Husky ? Husky est un outil qui permet de gérer les hooks git. Il permet de lancer des scripts à chaque fois qu'un événement git est déclenché. Par exemple, on peut lancer un script avant un commit, avant un push, avant.

-   [Husky](https://typicode.github.io/husky/#/)

```bash
pnpm add --save-dev husky
```

## Initialier Husky

```bash
  pnpm exec husky init

```

La fonction `init` de Husky va créer un fichier `.husky` à la racine de votre projet. Ce fichier contiendra les hooks git par défaut. et un dossier `_` qui contiendra d'autres hooks git. Dans la mesure ou vous voudirez utiliser un nouveau hook git, vous pouvez juste faire sortir le hook du dossier `_` et le mettre à la racine du dossier `.husky`.

## Installer Commitlint

Pourquoi Commitlint ? Commitlint est un outil qui permet de vérifier la syntaxe des messages de commit.
Combiner avec Husky, on peut vérifier la syntaxe des messages de commit avant que le commit soit effectué.

-   [Commitlint](https://commitlint.js.org/#/)

```bash
pnpm add --save-dev @commitlint/{config-conventional,cli}
```

## Configurer Commitlint

Créer un fichier `commitlint.config.js` à la racine du projet.

```javascript
module.exports = { extends: ['@commitlint/config-conventional'] };
```

## Utiliser Commitlint avec Husky

Modifier le fichier `.husky/pre-commit` pour qu'il ressemble à ceci :

```bash
npx --no-install commitlint --edit $1
```

## Installer Commitizen

Pourquoi Commitizen ? Commitizen est un outil qui permet de créer des messages de commit en suivant une convention. Il permet de créer des messages de commit qui sont plus lisibles et plus faciles à comprendre.

-   [Commitizen](https://commitizen-tools.github.io/commitizen/)

```bash
#npm
npm install --save-dev commitizen

#yarn
yarn install --save-dev commitizen

#pnpm
pnpm add --save-dev commitizen
```

## Configurer Commitizen

```bash
npx commitizen init cz-conventional-changelog --save-dev --save-exact --force
```

## Création du script commit

Modifier le fichier `package.json` pour ajouter un script `commit` :

```json
{
    "scripts": {
        "commit": "git add -A && pnpm cz"
    }
}
```

## Installer LintStaged

Pourquoi LintStaged ? LintStaged est un outil qui permet de lancer des scripts sur les fichiers qui sont en staging (c'est à dire les fichiers qui sont attentes d'être ajouté dans git). Par exemple, on peut lancer un script de linting sur les fichiers qui sont en staging.

-   [LintStaged](https://github.com/lint-staged/lint-staged)

```bash
  pnpm add --save-dev lint-staged
```

## Configurer LintStaged

Ajouter un fichier `.lintstagedrc` à la racine du projet.

```json
{
    "*.{js,jsx,ts,tsx}": ["eslint --fix"]
}
```

## Utiliser LintStaged avec Husky

Modifier le fichier `.husky/pre-commit` pour qu'il ressemble à ceci :

```bash
pnpm lint-staged
```
