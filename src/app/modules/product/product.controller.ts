import prisma from '../../utils/prisma';
import { IProduct } from './product.interface';
import AppError from '../../errors/appError';
import { AddProductValidationSchema, EditProductValidationSchema } from './product.validation';

export const addProduct = async (product: IProduct) => {
    const validatedProductData = AddProductValidationSchema.parse(product);

    return await prisma.product.create({
        data: validatedProductData,
    });
};

export const editProduct = async (productId: string, productData: Partial<IProduct>) => {
    const validatedProductData = EditProductValidationSchema.parse(productData);

    const existingProduct = await prisma.product.findUnique({ where: { id: Number(productId) } });

    if (!existingProduct) {
        throw new AppError(404, 'Product not found');
    }

    return await prisma.product.update({
        where: { id: Number(productId) },
        data: validatedProductData,
    });
};

export const deleteProduct = async (productId: string) => {
    return await prisma.product.delete({
        where: { id: Number(productId) },
    });
};

export const getAllProducts = async () => {
    return await prisma.product.findMany();
};
