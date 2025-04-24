'use client';

import { FormInput } from '@/shared/components/atoms/form-input';
import { Button } from '@/shared/components/button/button';
import Form from '@/shared/components/organisms/forms/form';
import { $toastify } from '@/shared/utils/toastify';
import { useState } from 'react';
import {
    forgotPasswordEmailSchema,
    type ForgotPasswordEmailValues
} from '../schemas/auth-schemas';

interface ForgotPasswordEmailProps {
    onBack: () => void;
    onEmailSent: (email: string) => void;
}

export function ForgotPasswordEmail({
    onBack,
    onEmailSent
}: ForgotPasswordEmailProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: ForgotPasswordEmailValues) => {
        try {
            setIsLoading(true);
            // In a real application, you would call the password reset API
            // await auth.passwordReset.sendCode({ email: data.email });

            // For demo purposes, we'll just simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            $toastify('success', 'Reset code sent to your email');
            onEmailSent(data.email);
        } catch (error) {
            $toastify(
                'error',
                error instanceof Error
                    ? error.message
                    : 'Failed to send reset code'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form
            useFormProps={{
                defaultValues: {
                    email: ''
                }
            }}
            onSubmit={handleSubmit}
            validationSchema={forgotPasswordEmailSchema}
        >
            {(methods, _) => {
                const {
                    register,
                    formState: { errors }
                } = methods;

                return (
                    <>
                        <div className="mb-6 text-center">
                            <h2 className="text-[2.4rem] font-bold">
                                Forgot Password
                            </h2>
                            <p className="mt-2 text-[1.6rem] text-gray-600">
                                Enter your email and we'll send you a reset code
                            </p>
                        </div>

                        <div className="space-y-6">
                            <FormInput
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                autoComplete="email"
                                error={errors.email?.message}
                                {...register('email')}
                            />

                            <div className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    loading={isLoading}
                                >
                                    {isLoading
                                        ? 'Sending...'
                                        : 'Send Reset Code'}
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={onBack}
                                >
                                    Back to Login
                                </Button>
                            </div>
                        </div>
                    </>
                );
            }}
        </Form>
    );
}
