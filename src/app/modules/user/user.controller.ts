import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';
import { IUser } from './user.interface';
import config from '../../config';
import AppError from '../../errors/appError';
import { LoginValidationSchema, RegistrationValidationSchema } from './user.validation';

export const registration = async (user: IUser) => {
    const validatedUserData = RegistrationValidationSchema.parse(user);
    const { email, password } = validatedUserData || {};

    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
        throw new AppError(400, 'Email is already taken');
    }
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    return await prisma.user.create({
        data: { ...validatedUserData, password: hashedPassword },
    });
};

export const login = async (email: string, password: string) => {
    const response = LoginValidationSchema.parse({ email, password });

    const user = await prisma.user.findUnique({ where: { email: response.email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AppError(401, 'Invalid email or password');
    }
    return user;
};

export const user = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
        throw new AppError(404, 'No user found');
    }
    return user;
};