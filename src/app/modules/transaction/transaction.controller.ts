import AppError from "../../errors/appError";
import prisma from "../../utils/prisma";

export const buyProduct = async (productId: string, buyerId: string) => {
    const product = await prisma.product.findUnique({ where: { id: Number(productId) } });

    if (!product) {
        throw new AppError(404, 'Product not found');
    }

    return await prisma.transaction.create({
        data: {
            buyerId: Number(buyerId),
            productId: Number(productId),
            type: 'PURCHASE',
        },
    });
};

export const getBoughtProducts = async (userId: string) => {
    return await prisma.transaction.findMany({
        where: {
            buyerId: Number(userId),
            type: 'PURCHASE',
        },
        include: {
            product: true,
        },
    });
};

export const getTransactionsByBuyerId = async (buyerId: string) => {
    return await prisma.transaction.findMany({
        where: { buyerId: Number(buyerId) },
    });
};

export const getTransactionsByProductId = async (productId: string) => {
    return await prisma.transaction.findMany({
        where: { productId: Number(productId) },
    });
};
