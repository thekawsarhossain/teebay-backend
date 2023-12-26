import { object, string, number, array, nativeEnum } from 'zod';
import { Categories, RentOption } from '../../common/enums';

export const AddProductValidationSchema = object({
    title: string({ required_error: 'Title is required' }).min(1, { message: "Title cannot be empty" }),
    categories: array(nativeEnum(Categories).refine((value) => Object.values(Categories).includes(value as Categories), { message: 'Invalid category' }), { required_error: 'Categories are required' }),
    description: string({ required_error: 'Description is required' }).min(1, { message: "Description cannot be empty" }),
    price: number({ required_error: 'Price is required' }).min(0, { message: "Price must be a positive number" }),
    rentPrice: number({ required_error: 'Rent price is required' }).min(0, { message: "Rent price must be a positive number" }),
    rentOption: nativeEnum(RentOption, { required_error: 'Rent option is required' }).refine((value) => Object.values(RentOption).includes(value as RentOption), { message: 'Invalid rent option' }),
    ownerId: number({ required_error: 'Owner ID is required' }),
});

export const EditProductValidationSchema = object({
    title: string().optional(),
    categories: array(nativeEnum(Categories).refine((value) => Object.values(Categories).includes(value as Categories), { message: 'Invalid category' })).optional(),
    description: string().optional(),
    price: number().optional(),
    rentPrice: number().optional(),
    rentOption: nativeEnum(RentOption).refine((value) => Object.values(RentOption).includes(value as RentOption), { message: 'Invalid rent option' }).optional(),
});
