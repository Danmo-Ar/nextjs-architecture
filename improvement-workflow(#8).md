# Configuration de Authentication

J'ai essayé d'ajouter l'authentification avec better-auth et je me suis rendu compte d'une chose : bien qu'il soit vraiment performant avec une panoplie de fonctionnalités, il est très difficile à configurer dans notre cas étant donné que tout le processus d'authentification est géré par une API tierce fournie par notre backend.  
En effet, better-auth nécessite une connexion directe à une base de données afin de fonctionner correctement, à l'instar de next-auth où la fonction `authorize` nous donne la possibilité de faire des requêtes à une API tierce et de gérer nous-mêmes la logique d'authentification.  
Je ne veux pas dire que better-auth est mauvais, mais il est plus adapté pour des applications qui gèrent elles-mêmes l'authentification et la base de données. Je ne compte pas utiliser next-auth parce qu'il n'est pas flexible.

Ainsi, je viens au point où je vais coder de façon simple des fonctions d'authentification côté serveur et client pour nous permettre, au fur et à mesure, d'ajouter plus de fonctionnalités comme les providers d'authentification, le refresh token, ou encore l'authentification à deux facteurs.

## Plan d'action

-   [ ] Créer un fichier `auth.ts` dans le dossier `lib` pour y mettre toutes les fonctions d'authentification.
-   [ ] Créer un fichier `auth-client.ts` dans le dossier `lib` pour y mettre toutes les fonctions d'authentification côté client (Ces fonctions seront responsable de la communication avec les routes handler).
-   [ ] Créer un fichier `route.ts` dans le dossier `app/api` pour y mettre toutes les routes d'authentification.
    -   [ ] Utiliser catch-all pour gérer toutes les routes d'authentification.
