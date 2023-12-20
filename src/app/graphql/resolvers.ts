import { IUser, IUserCred } from '../modules/user/user.interface';
import * as UserController from '../modules/user/user.controller';
import * as ProductController from '../modules/product/product.controller';
import * as TransactionController from '../modules/transaction/transaction.controller';
import * as RentalController from '../modules/rental/rental.controller';
import { IProduct } from '../modules/product/product.interface';

export const resolvers = {
    Query: {
        getUser: async (_parent: unknown, { id }: { id: string }) => {
            return await UserController.getUserById(id);
        },

        getProduct: async (_parent: unknown, { id }: { id: string }) => {
            return await ProductController.getProductById(id);
        },

        getUserProducts: async (_parent: unknown, { userId }: { userId: string }) => {
            return await ProductController.getProductsByOwnerId(userId);
        },

        getAllProducts: async () => {
            return await ProductController.getAllProducts();
        },

        getBoughtProducts: async (_parent: unknown, { userId }: { userId: string }) => {
            return await TransactionController.getBoughtProducts(userId);
        },

        getSoldProducts: async (_parent: unknown, { userId }: { userId: string }) => {
            return await ProductController.getSoldProducts(userId);
        },

        getBorrowedProducts: async (_parent: unknown, { userId }: { userId: string }) => {
            return await RentalController.getBorrowedProducts(userId);
        },

        getLentProducts: async (_parent: unknown, { userId }: { userId: string }) => {
            return await ProductController.getLentProducts(userId);
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
            return await ProductController.addProduct({ ...product, ownerId: Number(product.ownerId) });
        },
        editProduct: async (_parent: unknown, { productId, product }: { productId: string, product: Partial<IProduct> }) => {
            return await ProductController.editProduct(productId, product);
        },
        deleteProduct: async (_parent: unknown, { productId }: { productId: string }) => {
            return await ProductController.deleteProduct(productId);
        },

        buyProduct: async (_parent: unknown, { productId, buyerId }: { productId: string, buyerId: string }) => {
            return await TransactionController.buyProduct(productId, buyerId);
        },
        rentProduct: async (_parent: unknown, { productId, renterId, startTime, endTime }: { productId: string, renterId: string, startTime: string, endTime: string }) => {
            return await RentalController.rentProduct(productId, renterId, startTime, endTime);
        }
    },

    User: {
        products: async (parent: unknown) => {
            return await ProductController.getProductsByOwnerId((parent as { id: string }).id);
        },
        transactions: async (parent: unknown) => {
            return await TransactionController.getTransactionsByBuyerId((parent as { id: string }).id);
        },
        rentals: async (parent: unknown) => {
            return await RentalController.getRentalsByRenterId((parent as { id: string }).id);
        },
    },

    Product: {
        owner: async (parent: unknown) => {
            return await UserController.getUserById((parent as { ownerId: string }).ownerId);
        },
        transactions: async (parent: unknown) => {
            return await TransactionController.getTransactionsByProductId((parent as { id: string }).id);
        },
        rentals: async (parent: unknown) => {
            return await RentalController.getRentalsByProductId((parent as { id: string }).id);
        },
    },

    Transaction: {
        buyer: async (parent: unknown) => {
            return await UserController.getUserById((parent as { buyerId: string }).buyerId);
        },
        product: async (parent: unknown) => {
            return await ProductController.getProductById((parent as { productId: string }).productId);
        },
    },

    Rental: {
        product: async (parent: unknown) => {
            return await ProductController.getProductById((parent as { productId: string }).productId);
        },
        renter: async (parent: unknown) => {
            return await UserController.getUserById((parent as { renterId: string }).renterId);
        },
    },
}
