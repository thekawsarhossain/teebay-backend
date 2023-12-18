import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';
import { IUser } from './user.interface';
import config from '../../config';
import AppError from '../../errors/appError';

export const registration = async (user: IUser) => {
    const hashedPassword = await bcrypt.hash(user.password, config.bcrypt_salt_rounds as string);
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