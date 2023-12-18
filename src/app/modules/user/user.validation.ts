import { object, string } from 'zod';

export const RegistrationValidationSchema = object({
    firstName:
        string()
            .min(3, { message: 'First Name must be at least 3 character long' })
            .max(25, { message: 'First Name cannot be longer than 25 characters' })
            .refine((value) => /^[A-Z]/.test(value), {
                message: 'First Name must start with a capital letter',
            }),
    lastName: string()
        .min(3, { message: 'Last Name must be at least 3 character long' })
        .max(25, { message: 'Last Name cannot be longer than 25 characters' }),
    address: string({ required_error: 'Address is required' }),
    email: string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email format' }),
    phone: string()
        .min(11, { message: 'Phone number must be at least 11 characters long' }),
    password: string()
        .min(8, { message: 'Password must be at least 8 characters long' }),
});

export const LoginValidationSchema = object({
    email: string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email format' }),
    password: string({ required_error: 'Password is required' }),
});
