import { IUser, IUserCred } from '../modules/user/user.interface';
import * as UserController from '../modules/user/user.controller';
import * as ProductController from '../modules/product/product.controller';
import { IProduct } from '../modules/product/product.interface';

export const resolvers = {
    Query: {
        getUser: async (_parent: unknown, { id }: { id: string }) => {
            return await UserController.user(id);
        },

        getAllProducts: async () => {
            return await ProductController.getAllProducts();
        },
    },

    Mutation: {
        loginUser: async (_parent: unknown, { email, password }: IUserCred) => {
            return await UserController.login(email, password);
        },
        registerUser: async (_parent: unknown, { user }: { user: IUser }) => {
            return await UserController.registration(user);
        },

        addProduct: async (_parent: unknown, { product }: { product: IProduct }) => {
            console.log("product", product)
            return await ProductController.addProduct({...product, ownerId: Number(product.ownerId)});
        },
        editProduct: async (_parent: unknown, { productId, product }: { productId: string, product: Partial<IProduct> }) => {
            return await ProductController.editProduct(productId, product);
        },
        deleteProduct: async (_parent: unknown, { productId }: { productId: string }) => {
            return await ProductController.deleteProduct(productId);
        },
    }
}