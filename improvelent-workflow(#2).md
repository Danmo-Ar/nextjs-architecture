# Add Configuration For Type Safety env variable (#2)

## Créer un fichier de configuration (env)

-   Créer un fichier `env.ts` dans le dossier `src/config`
    Ce fichier utilisera le package `dotenv` pour charger les variables d'environnement.
    Aussi le package zod pour valider les variables d'environnement.
    L'objectif est de bloquer le démarrage de l'application si les variables d'environnement ne sont pas correctement configurées.

    Contenu du fichier `env.js`:
    Notons qu'ici `JS` est utilisé comme extention pour la configuration des variables d'environnement car _il est éxécuté par node qui ne supporte pas les fichiers typescript_.
    Par ricochet, tout les fichiers utilisé dans se dernier doivent être en `JS`.

```typescript
import * as z from 'zod';
import { formatEnvError } from '../shared/utils/format-env-error.js';

const createEnv = () => {
    const EnvSchema = z.object({
        // 1 - schema de validation des variables d'environnement
        server: z.object({
            NODE_ENV: z.enum(['development', 'test', 'production']),
            API_URL: z.string().url(),
            APP_URL: z.string().optional().default('http://localhost:3000')
        }),
        client: z.object({})
    });

    const envVars = {
        // 2 - les variables d'environnement
        server: {
            NODE_ENV: process.env.NODE_ENV,
            API_URL: process.env.API_URL,
            APP_URL: process.env.APP_URL
        },
        client: {}
    };

    const parsedEnv = EnvSchema.safeParse(envVars); // 3- permet de valider les variables d'environnement

    try {
        if (!parsedEnv.success) {
            formatEnvError(parsedEnv.error); // 4- permet de formater les erreurs
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }

    return { EnvSchema, envJS: parsedEnv.data } ?? {};
};

export const { EnvSchema, envJS } = createEnv();
```

## Utilisation des variables d'environnement

Nous avons crée un fichier de configuration pour les variables d'environnement, il est temps de les utiliser dans notre application.
Comment l'exécuter?

-   En l'important dans le prémier fichier lu par next quand il démarre l'application(`pnpm dev`). c'est à dire `next.config.js`

```javascript
import './src/config/env.js';
const nextConfig = {
    reactStriteMode: true
};

export default nextConfig;
```

l'importation directe sans extraction de valeur `import './src/config/env.js';` permet de lancer directement fonction createEnv qui va valider les variables d'environnement.
Pour rappel cette fonction est éxécutée dans le fichier `env.js` , donc par défaut lors de l'importation du fichier node le lira et donc éxécutera la fonction `createEnv`.

## Typage des variables d'environnement

Bon nous avons notre fichier env mais celui ci est en `JS` et nous voulons utiliser les variables d'environnement dans notre application en `TS`.
Pour cela nous faire un petit trick dans le fichier d'importation global `index.ts` se trouvant dans `src/config` pour permettre à typescript de reconnaitre les variables.d'environnement.

```typescript
// -- Start  : Transform JS variable to TS variable
import * as z from 'zod';
import { EnvSchema, envJS } from './env';

type Env = z.infer<typeof EnvSchema>;
export const $env = envJS as Env;

// -- End  : Transform JS variable to TS variable
```

Maintenant nous pouvons utiliser cette variable typée dans notre application.

```typescript
import { $env } from './config';

console.log($env.server.NODE_ENV); // 'development'
```

## Fonction de formatage des erreurs

Contenu du fichier `format-env-error.js`
Pour plus de détails consulter le fichier `format-env-error.js` dans le dossier `shared/utils`
