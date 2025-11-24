import { Person } from "./person";

export interface Client extends Person{
    cpf: string;
    phone: string;
}