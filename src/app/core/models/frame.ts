import { FrameBrand } from "../enums/frame-brand";
import { FrameType } from "../enums/frame-type";

export interface Frame {
    id: number;
    code: string;
    name: string;
    frameBrand?: FrameBrand;
    frameType?: FrameType;
    stockQuantity?: number;
}