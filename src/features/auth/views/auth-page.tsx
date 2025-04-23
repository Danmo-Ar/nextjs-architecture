'use client';

import Logo from '@/shared/components/atoms/logo';
import { useState } from 'react';
import { ForgotPasswordEmail } from '../components/forgot-password-email';
import { LoginForm } from '../components/login-form';
import { OtpVerification } from '../components/otp-verification';
import { ResetPassword } from '../components/reset-password';

type AuthStep =
    | 'login'
    | 'forgotPassword'
    | 'otpVerification'
    | 'resetPassword';

export function AuthPage() {
    const [step, setStep] = useState<AuthStep>('login');
    const [email, setEmail] = useState('');

    const renderStep = () => {
        switch (step) {
            case 'login':
                return (
                    <LoginForm
                        onForgotPassword={() => setStep('forgotPassword')}
                    />
                );
            case 'forgotPassword':
                return (
                    <ForgotPasswordEmail
                        onBack={() => setStep('login')}
                        onEmailSent={(email) => {
                            setEmail(email);
                            setStep('otpVerification');
                        }}
                    />
                );
            case 'otpVerification':
                return (
                    <OtpVerification
                        email={email}
                        onBack={() => setStep('forgotPassword')}
                        onVerified={() => setStep('resetPassword')}
                    />
                );
            case 'resetPassword':
                return (
                    <ResetPassword
                        email={email}
                        onBack={() => setStep('otpVerification')}
                        onReset={() => setStep('login')}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
            <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
                <div className="mb-8 flex justify-center">
                    <Logo />
                </div>

                {step === 'login' && (
                    <div className="mb-6 text-center">
                        <h2 className="text-[2.4rem] font-bold">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-[1.6rem] text-gray-600">
                            Sign in to your account
                        </p>
                    </div>
                )}

                {renderStep()}
            </div>
        </div>
    );
}
