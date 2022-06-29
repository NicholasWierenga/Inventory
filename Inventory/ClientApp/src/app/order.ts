export interface Order {
    orderId: number,
    userId: number,
    quantity: number,
    orderDate: Date,
    locationId: string,
    supplier: string
}