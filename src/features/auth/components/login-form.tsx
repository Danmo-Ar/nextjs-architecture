'use client';

import { FormInput } from '@/shared/components/atoms/form-input';
import { Button } from '@/shared/components/button/button';
import Form from '@/shared/components/organisms/forms/form';
import { api } from '@/shared/lib/api-client';
import { $toastify } from '@/shared/utils/toastify';
import { useState } from 'react';
import { loginSchema, type LoginFormValues } from '../schemas/auth-schemas';

interface LoginFormProps {
    onForgotPassword: () => void;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: LoginFormValues) => {
        try {
            setIsLoading(true);

            api.selfPost('api/auth/sign-in', data);

            $toastify('success', 'Login successful');
        } catch (error) {
            $toastify(
                'error',
                error instanceof Error ? error.message : 'Login failed'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form<LoginFormValues>
            useFormProps={{
                defaultValues: {
                    email: '',
                    password: '',
                    rememberMe: false
                }
            }}
            onSubmit={handleSubmit}
            validationSchema={loginSchema}
        >
            {(methods, _) => {
                const {
                    register,
                    formState: { errors }
                } = methods;

                return (
                    <>
                        <div className="space-y-6">
                            <FormInput
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                autoComplete="email"
                                error={errors.email?.message}
                                {...register('email')}
                            />

                            <FormInput
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                autoComplete="current-password"
                                error={errors.password?.message}
                                {...register('password')}
                            />

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="remember-me"
                                        className="h-4 w-4 rounded border-gray-300"
                                        {...register('rememberMe')}
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="text-[1.4rem]"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <button
                                    type="button"
                                    onClick={onForgotPassword}
                                    className="text-[1.4rem] text-primary-600 hover:text-primary-500"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                loading={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </div>
                    </>
                );
            }}
        </Form>
    );
}
