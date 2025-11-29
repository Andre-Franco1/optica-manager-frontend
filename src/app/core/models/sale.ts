import { CardBrand } from "../enums/card-brand";
import { PaymentMethod } from "../enums/payment-method";
import { Status } from "../enums/status";
import { Client } from "./client";
import { Prescription } from "./prescription";
import { SaleItem } from "./sale-item";
import { User } from "./user";

export interface Sale {
    id: number;
    issueDate: Date;
    estimatedDeliveryDate: Date;
    deliveryDate: Date | null;
    paymentMethod: PaymentMethod;
    cardBrand: CardBrand | null;
    installments: number | null;
    totalAmount: number;
    comments: string;
    status: Status;

    client: Client | null;
    prescription: Prescription | null;

    user: User;

    saleItems: SaleItem[];
}