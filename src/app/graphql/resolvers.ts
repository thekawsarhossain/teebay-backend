import * as UserController from '../modules/user/user.controller';
import { IUser, IUserCred } from '../modules/user/user.interface';

export const resolvers = {
    Query: {
        getUser: async (_parent: unknown, { id }: { id: string }) => {
            return await UserController.user(id)
        }
    },

    Mutation: {
        loginUser: async (_parent: unknown, { email, password }: IUserCred) => {
            return await UserController.login(email, password)
        },
        registerUser: async (_parent: unknown, { user }: { user: IUser }) => {
            return await UserController.registration(user)
        },
    }
}