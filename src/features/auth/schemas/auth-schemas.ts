import { z } from 'zod';

// Login form schema
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional().default(false)
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Forgot password - email request schema
export const forgotPasswordEmailSchema = z.object({
    email: z.string().email('Invalid email address')
});

export type ForgotPasswordEmailValues = z.infer<
    typeof forgotPasswordEmailSchema
>;

// Forgot password - OTP verification schema
export const otpVerificationSchema = z.object({
    otpCode: z.string().min(6, 'OTP code must be at least 6 characters')
});

export type OtpVerificationValues = z.infer<typeof otpVerificationSchema>;

// Reset password schema
export const resetPasswordSchema = z
    .object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z
            .string()
            .min(6, 'Password must be at least 6 characters')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
