export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phone: string;
    password: string;
}

export interface IUserCred {
    email: string;
    password: string;
}