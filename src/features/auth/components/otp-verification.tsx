'use client';

import { FormInput } from '@/shared/components/atoms/form-input';
import { Button } from '@/shared/components/button/button';
import Form from '@/shared/components/organisms/forms/form';
import { $toastify } from '@/shared/utils/toastify';
import { useState } from 'react';
import {
    otpVerificationSchema,
    type OtpVerificationValues
} from '../schemas/auth-schemas';

interface OtpVerificationProps {
    email: string;
    onBack: () => void;
    onVerified: () => void;
}

export function OtpVerification({
    email,
    onBack,
    onVerified
}: OtpVerificationProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: OtpVerificationValues) => {
        try {
            setIsLoading(true);
            // In a real application, you would verify the OTP code with the API
            // await auth.passwordReset.verifyCode({ email, code: data.otpCode });

            // For demo purposes, we'll just simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            $toastify('success', 'Code verified successfully');
            onVerified();
        } catch (error) {
            $toastify(
                'error',
                error instanceof Error
                    ? error.message
                    : 'Invalid verification code'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form
            useFormProps={{
                defaultValues: {
                    otpCode: ''
                }
            }}
            onSubmit={handleSubmit}
            validationSchema={otpVerificationSchema}
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
                                Verification Code
                            </h2>
                            <p className="mt-2 text-[1.6rem] text-gray-600">
                                Enter the verification code sent to:
                                <br />
                                <span className="font-medium">{email}</span>
                            </p>
                        </div>

                        <div className="space-y-6">
                            <FormInput
                                label="Verification Code"
                                placeholder="Enter the 6-digit code"
                                error={errors.otpCode?.message}
                                {...register('otpCode')}
                            />

                            <div className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    loading={isLoading}
                                >
                                    {isLoading ? 'Verifying...' : 'Verify Code'}
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
