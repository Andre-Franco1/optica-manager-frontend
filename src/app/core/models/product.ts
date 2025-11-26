import { FrameCategory } from "../enums/frame-category";
import { LensType } from "../enums/lens-type";
import { ProductType } from "../enums/product-type";

export interface Product {
    id: number;
    code: string;
    name: string;
    costPrice: number;
    salePrice: number;
    type: ProductType;

    // frame's attributes
    category?: FrameCategory;
    stockQuantity?: number;

    // lens' attributes
    lensType?: LensType;

}