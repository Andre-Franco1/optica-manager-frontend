import { LensType } from "../enums/lens-type";

export interface Lens {
    id: number;
    code: string;
    name: string;
    costPrice: number;
    salePrice: number;
    lensType?: LensType;

}