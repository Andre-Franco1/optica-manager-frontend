import { Product } from "./product";

export interface SaleItem {
    id: number;
    price: number;
    product: Product;
}