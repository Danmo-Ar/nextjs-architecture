// Chaque fichier devra concerner une seule ressource à get.

import { api } from '@/shared/lib/api-client';
import { useQuery } from '@tanstack/react-query';

// 1 : Créer le type de la réponse
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

// 2 : Créer la fonction qui va appeler l'api
export const getUser = async () => {
    const user = await api.get<User>(
        'https://jsonplaceholder.typicode.com/users/1',
        {},
        true
    );
    return user;
};

// 3 : Créer le hook qui va appeler la fonction si besoin utiliser les paramètres
// Notons que toutes les traitement additionnels qui gèrent le cache, la mise à jour des données, la gestion des erreurs, etc. sont dans ce hook
// Exemple le onSuccess, onError, onSettled, etc.
export const useGetUser = () =>
    useQuery<User, Error>({
        queryKey: ['user'],
        queryFn: getUser
    });

// Il suffit d'importer ce hook dans le composant qui en a besoin
// et de l'utiliser comme n'importe quel autre hook
// const { data, isLoading, isError } = useGetUser();
