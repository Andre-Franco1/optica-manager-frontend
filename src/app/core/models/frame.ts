import { FrameCategory } from "../enums/frame-category";

export interface Frame {
    id: number;
    code: string;
    name: string;
    costPrice: number;
    salePrice: number;
    frameCategory?: FrameCategory;
    stockQuantity?: number;
}