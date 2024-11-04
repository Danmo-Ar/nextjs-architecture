/**
 * Ce fichier de configuration contient toutes les routes de l'application
 * C'est un moyen de tout centraliser pour une meilleur gestion des routes
 */

export const APP_ROUTES = {
	products: {
		index: "/products",
		single: (slug: string) => `/products/${slug}`,
	},
};
