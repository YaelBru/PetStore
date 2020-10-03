import { Order } from './order';

export interface User {
    userId: string;
    fullName: string;
    email: string;
    password: string;
    orders: Order[];
}
