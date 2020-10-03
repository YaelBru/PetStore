import { SelectedItem } from '../interfaces/Item';

export interface Order {
    userId: string | number;
    billingDetails: {
        fullName: string;
        mobile: number;
        email: string;
        shippingAddress: string,
        orderNotes?: string;
        payment: {
            type: string;
            creditCard?: string;
            creditCardName?: string;
            expDate?: string;
            cvv?: string;
        }
    };
    orderDetails: {
        orderItems: SelectedItem[];
        itemsTotalPrice: number;
        itemsTotalQuantity: number;
    };
}

export interface ConfirmedOrder {
    _id: string;
    userId: string;
    email: string;
    fullName: string;
    mobile: string;
    orderItems: [];
    itemsTotalPrice: number;
    itemsTotalQuantity: number;
    orderNotes: string;
    shippingAddress: string;
    date: string;
}
