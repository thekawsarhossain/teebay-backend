import AppError from "../../errors/appError";
import prisma from "../../utils/prisma";

export const rentProduct = async (productId: string, renterId: string, startTime: string, endTime: string) => {
    const product = await prisma.product.findUnique({ where: { id: Number(productId) } });

    if (!product) {
        throw new AppError(404, 'Product not found');
    }

    const existingRentals = await prisma.rental.findMany({
        where: {
            productId: Number(productId),
            startTime: {
                lte: new Date(endTime),
            },
            endTime: {
                gte: new Date(startTime),
            },
        },
    });

    if (existingRentals.length > 0) {
        throw new AppError(400, 'Product is already rented during the requested time');
    }

    return await prisma.rental.create({
        data: {
            renterId: Number(renterId),
            productId: Number(productId),
            startTime: new Date(startTime),
            endTime: new Date(endTime),
        },
    });
};

export const getBorrowedProducts = async (userId: string) => {
    const rentalWithProducts = await prisma.rental.findMany({
        where: {
            renterId: Number(userId),
        },
        include: {
            product: true,
        },
    });

    return rentalWithProducts?.map((rental) => rental.product) ?? [];
};

export const getRentalsByRenterId = async (renterId: string) => {
    return await prisma.rental.findMany({
        where: { renterId: Number(renterId) },
    });
};

export const getRentalsByProductId = async (productId: string) => {
    return await prisma.rental.findMany({
        where: { productId: Number(productId) },
    });
};
