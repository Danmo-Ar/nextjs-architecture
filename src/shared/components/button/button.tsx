/* eslint-disable tailwindcss/no-custom-classname */
import { cn } from '@/shared/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';

// Create a variant for the button component
const buttonVariant = cva(
    'flex-center soft-shadow h-[6.3rem] gap-2  px-[3.95rem] text-[1.8rem]  font-semibold  disabled:cursor-not-allowed disabled:opacity-65',
    {
        variants: {
            variant: {
                primary:
                    'btn-animate btn-animate--primary  bg-black text-white',
                outline: ' border-primary text-primary  bg-transparent',
                secondary:
                    '  btn-animate btn-animate--secondary bg-white text-black '
            },
            size: {},
            types: {
                onlyIcon:
                    'flex size-[3.4rem] items-center  justify-center rounded-full border-2  px-0'
            }
        },
        defaultVariants: {
            variant: 'primary'
        }
    }
);

// create Button Props
export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariant> {
    loading?: boolean;
}

const Button = ({
    className,
    size,
    types,
    loading,
    variant,
    children,
    ...props
}: ButtonProps) => {
    return (
        <button
            disabled={loading}
            className={cn(buttonVariant({ className, size, types, variant }))}
            {...props}
        >
            {<span>{children}</span>}
        </button>
    );
};

export { Button, buttonVariant };
