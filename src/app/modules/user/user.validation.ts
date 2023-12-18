import { number, object, string } from 'zod';

export const RegistrationValidationSchema = object({
    id: number().int().positive(),
    firstName:
        string()
            .min(1)
            .max(25)
            .refine((value) => /^[A-Z]/.test(value), {
                message: 'First Name must start with a capital letter',
            }),
    lastName: string().min(1).max(25),
    address: string(),
    email: string().email(),
    phone: string().min(11),
    password: string().min(8),
});

export const LoginValidationSchema = object({
    email: string().email(),
    password: string(),
});
