import { User } from "./user"

export interface Order {
    orderId: number,
    userId: number,
    quantity: number,
    orderDate: Date
    user: User;
}