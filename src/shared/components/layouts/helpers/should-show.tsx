/**
 * ShouldShow Component:
 * Ce composant permet d'afficher un composant si une condition est vraie.
 * Il prend en paramètre une condition (when) et un composant à afficher dans (children).
 * Si la condition est vraie, le composant est affiché, sinon il n'est pas affiché.
 * Il prend également un paramètre elseShow qui permet d'afficher un autre composant si la condition est fausse.
 * Il permet de réduire la duplication de code dans les composants. en ce passant de la syntaxe {condition && <Component />}
 */

import { PropsWithChildren, ReactNode } from "react";

const ShouldShow = ({
	when,
	elseShow,
	children,
}: PropsWithChildren<{ when: boolean; elseShow?: ReactNode }>) => {
	if (when) return <>{children}</>;
	return <>{elseShow || null}</>;
};

export default ShouldShow;
