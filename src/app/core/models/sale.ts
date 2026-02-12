import { CardBrand } from "../enums/card-brand";
import { PaymentMethod } from "../enums/payment-method";
import { SaleStatus } from "../enums/sale-status";
import { Client } from "./client";
import { Prescription } from "./prescription";
import { SaleItem } from "./sale-item";
import { User } from "./user";

export interface Sale {
    id: number;
    issueDate: Date;
    estimatedDeliveryDate: Date;
    deliveryDate: Date | null;

    totalAmount: number;
    paymentMethod: PaymentMethod;
    cardBrand: CardBrand | null;
    installments: number | null;
    
    comments: string;
    saleStatus: SaleStatus;

    
    clientId: number,
    clientName: string,
    clientCpf: string
    

    prescriptionId: number | null;
    prescriptionDate: Date | null;
    prescriptionOphthalmologistName: string | null;  

    user: {id : number};

    saleItems: SaleItem[];
}