import { Order } from "./order";

export interface User {
    orders: Order[], // Not sure how this is used. It's not a column in the DB.
    id: number,
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    phone: number
}