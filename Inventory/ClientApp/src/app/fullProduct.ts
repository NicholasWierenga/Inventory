import { Product } from "./product";
import { ProductInv } from "./productInv";

export interface FullProduct {
    product: Product,
    productInv: ProductInv
}