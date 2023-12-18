import { IUser, IUserCred } from '../modules/user/user.interface';
import * as UserController from '../modules/user/user.controller';
import { LoginValidationSchema, RegistrationValidationSchema } from '../modules/user/user.validation';

export const resolvers = {
    Query: {
        getUser: async (_parent: unknown, { id }: { id: string }) => {
            return await UserController.user(id);
        }
    },

    Mutation: {
        loginUser: async (_parent: unknown, { email, password }: IUserCred) => {
            const response = LoginValidationSchema.parse({ email, password });
            return await UserController.login(response.email, response.password);
        },
        registerUser: async (_parent: unknown, { user }: { user: IUser }) => {
            const validatedUserData = RegistrationValidationSchema.parse(user);
            return await UserController.registration(validatedUserData);
        },
    }
}