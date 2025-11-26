import { Sex } from "../enums/sex";

export interface Client {
    id: number;
    name: string;
    cpf: string;
    phone: string;
    sex: Sex;
}