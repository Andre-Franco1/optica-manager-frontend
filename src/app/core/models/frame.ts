import { FrameBrand } from "../enums/frame-brand";
import { FrameType } from "../enums/frame-type";

export interface Frame {
    id: number;
    code: string;
    name: string;
    brand: FrameBrand;
    type: FrameType;
    stockQuantity: number;
}