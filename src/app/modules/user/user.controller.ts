import { RegistrationValidationSchema, LoginValidationSchema } from './user.validation';
import * as UserService from './user.service';
import { IUser } from './user.interface';
import AppError from '../../errors/appError';

export const registration = async (userData: IUser) => {
    try {
        const user = RegistrationValidationSchema.parse(userData);
        const newUser = await UserService.registration(user);
        return newUser;
    } catch (err) {
        throw new AppError(500, (err as { message: string })?.message || "Something went wrong");
    }
};

export const login = async (email: string, password: string) => {
    try {
        const validatedRes = LoginValidationSchema.parse({ email, password });
        const user = await UserService.login(validatedRes.email, validatedRes.password);
        return user
    } catch (err) {
        throw new AppError(500, (err as { message: string })?.message || "Something went wrong");
    }
};

export const user = async (id: string) => {
    try {
        const user = await UserService.user(id);
        return user
    } catch (err) {
        throw new AppError(500, (err as { message: string })?.message || "Something went wrong");
    }
};
