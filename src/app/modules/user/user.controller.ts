import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';
import { IUser } from './user.interface';
import config from '../../config';
import AppError from '../../errors/appError';

export const registration = async (user: IUser) => {
    const { email, password } = user || {};
    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
        throw new AppError(400, 'Email is already taken');
    }
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    return await prisma.user.create({
        data: { ...user, password: hashedPassword },
    });
};

export const login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
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