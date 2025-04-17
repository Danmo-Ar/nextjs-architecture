/**
 * Ce Component est un helper qui permet de créer des flexbox layout
 * Son but est de reduire l'utilisation de classes css dans tout les composants qui utilisent des flexbox.
 * Expliquation des props:
 * as: permet de définir le type de balise html à utiliser
 * settings: permet de définir les propriétés de la flexbox
 * className: permet de définir des classes css supplémentaires
 * children: permet de définir le contenu du composant
 *
 * Explcation des props de settings :
 *
 * shouldWrap: permet de définir si les éléments doivent être sur une seule ligne ou sur plusieurs lignes
 * shouldReverse: permet de définir si les éléments doivent être inversés
 * isColumn: permet de définir si les éléments doivent être en colonne
 * shouldTakeSameSpace: permet de définir si les éléments doivent prendre le même espace : par défaut: true
 * spacing: permet de définir l'espace entre les éléments : par défaut : "gap-5"
 * justify: permet de définir la propriété justify-content de la flexbox
 * align: permet de définir la propriété align-items de la flexbox
 * placeItems: permet de définir la propriété place-items de la flexbox
 *
 */

import { cn } from '@/shared/lib/utils';
import type { As } from '@/shared/types';
import type { HTMLAttributes, PropsWithChildren } from 'react';

export interface FlexRowProps extends HTMLAttributes<HTMLDivElement> {
    as?: As;
    settings?: {
        shouldWrap?: boolean;
        shouldReverse?: boolean;
        isColumn?: boolean;
        shouldTakeSameSpace?: boolean;
        spacing?: string;
        justify?:
            | 'center'
            | 'between'
            | 'around'
            | 'evenly'
            | 'start'
            | 'end'
            | '';
        align?: 'center' | 'stretch' | 'baseline' | 'start' | 'end' | '';
        placeItems?: 'center' | 'stretch' | 'baseline' | 'start' | 'end' | '';
    };
}

const styleConfig: Record<
    'justify' | 'align' | 'placeItems',
    { [key: string]: string }
> = {
    justify: {
        center: 'justify-center',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
        start: 'justify-start',
        end: 'justify-end'
    },
    align: {
        center: 'items-center',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
        start: 'items-start',
        end: 'items-end'
    },
    placeItems: {
        center: 'place-items-center',
        stretch: 'place-items-stretch',
        baseline: 'place-items-baseline',
        start: 'place-items-start',
        end: 'place-items-end'
    }
};

const Flex = ({
    children,
    as = 'div',
    settings,
    className,
    ...props
}: PropsWithChildren<FlexRowProps>) => {
    const Component = as;
    return (
        <Component
            className={cn(
                'flex   ',
                settings?.spacing ?? 'gap-5',
                {
                    [styleConfig.align[settings?.align ?? '']]: settings?.align,
                    [styleConfig.justify[settings?.justify ?? '']]:
                        settings?.justify,
                    [styleConfig.placeItems[settings?.placeItems ?? '']]:
                        settings?.placeItems,

                    'flex-wrap': settings?.shouldWrap,
                    'flex-col': settings?.isColumn,
                    '[&>*]:basis-0 [&>*]:flex-1':
                        settings?.shouldTakeSameSpace ?? true,
                    [`${
                        settings?.isColumn ?? false
                            ? 'flex-col-reverse'
                            : 'flex-row-reverse'
                    }`]: settings?.shouldReverse
                },
                className
            )}
            {...props}
        >
            <>{children}</>
        </Component>
    );
};

export default Flex;
