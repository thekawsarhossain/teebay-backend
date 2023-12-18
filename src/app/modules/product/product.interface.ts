import { Categories, RentOption } from "../../common/enums";

export interface IProduct {
    title: string;
    categories: Categories[];
    description: string;
    price: number;
    rentPrice: number;
    rentOption: RentOption;
    ownerId: number;
}