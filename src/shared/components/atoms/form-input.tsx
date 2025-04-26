import { cn } from '@/shared/lib/utils';
import { forwardRef } from 'react';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const FormInput = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="mb-2 block text-[1.4rem] font-medium">
                        {label}
                    </label>
                )}
                <input
                    className={cn(
                        'w-full rounded-md border border-gray-300 px-4 py-3 text-[1.6rem] shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
                        error &&
                            'border-red-500 focus:border-red-500 focus:ring-red-500',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-[1.3rem] text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';

export { FormInput };
