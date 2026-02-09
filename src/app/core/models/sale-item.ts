import { ProductType } from "../enums/product-type";

export interface SaleItem {
    id: number;
    price: number;
    productId: number;
    productName: string;
    productType: ProductType;
}