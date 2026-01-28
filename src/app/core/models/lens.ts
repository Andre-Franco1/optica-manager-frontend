import { LensBrand } from "../enums/lens-brand";
import { LensIndex } from "../enums/lens-index";
import { LensMaterial } from "../enums/lens-material";
import { LensTreatment } from "../enums/lens-treatment";
import { LensType } from "../enums/lens-type";

export interface Lens {
    id: number;
    code: string;
    name: string;
    brand: LensBrand;
    index: LensIndex;
    material: LensMaterial;
    treatments: LensTreatment[];
    type: LensType;

}