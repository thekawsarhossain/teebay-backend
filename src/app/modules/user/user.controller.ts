/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { RegistrationValidationSchema, LoginValidationSchema } from './user.validation';
import * as authService from './user.service';
import catchAsync from '../../utils/catchAsync';

export const registration = catchAsync(async (req: Request, _res: Response) => {
    const user = RegistrationValidationSchema.parse(req.body);
    const newUser = await authService.registration(user);
    return newUser;
});

export const login = async (req: Request, _res: Response) => {
    const { email, password } = LoginValidationSchema.parse(req.body);
    const user = await authService.login(email, password);
    return user
};
