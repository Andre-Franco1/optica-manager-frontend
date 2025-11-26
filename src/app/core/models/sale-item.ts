import { Product } from "./product";

export interface SaleItem {
    id: number;
    quantity: number;
    unitPrice: number;
    product: Product;
}