'use client';

import { FormInput } from '@/shared/components/atoms/form-input';
import { Button } from '@/shared/components/button/button';
import Form from '@/shared/components/organisms/forms/form';
import { $toastify } from '@/shared/utils/toastify';
import { useState } from 'react';
import {
    resetPasswordSchema,
    type ResetPasswordValues
} from '../schemas/auth-schemas';

interface ResetPasswordProps {
    email: string;
    onBack: () => void;
    onReset: () => void;
}

export function ResetPassword({ email, onBack, onReset }: ResetPasswordProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: ResetPasswordValues) => {
        try {
            setIsLoading(true);
            // In a real application, you would call the reset password API
            // await auth.passwordReset.resetPassword({
            //   email,
            //   newPassword: data.password
            // });

            // For demo purposes, we'll just simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            $toastify('success', 'Password reset successfully');
            onReset();
        } catch (error) {
            $toastify(
                'error',
                error instanceof Error
                    ? error.message
                    : 'Failed to reset password'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form
            useFormProps={{
                defaultValues: {
                    password: '',
                    confirmPassword: ''
                }
            }}
            onSubmit={handleSubmit}
            validationSchema={resetPasswordSchema}
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
                                Reset Password
                            </h2>
                            <p className="mt-2 text-[1.6rem] text-gray-600">
                                Create a new password for:
                                <br />
                                <span className="font-medium">{email}</span>
                            </p>
                        </div>

                        <div className="space-y-6">
                            <FormInput
                                label="New Password"
                                placeholder="Enter new password"
                                type="password"
                                error={errors.password?.message}
                                {...register('password')}
                            />

                            <FormInput
                                label="Confirm Password"
                                placeholder="Confirm new password"
                                type="password"
                                error={errors.confirmPassword?.message}
                                {...register('confirmPassword')}
                            />

                            <div className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    loading={isLoading}
                                >
                                    {isLoading
                                        ? 'Resetting...'
                                        : 'Reset Password'}
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={onBack}
                                >
                                    Back
                                </Button>
                            </div>
                        </div>
                    </>
                );
            }}
        </Form>
    );
}
