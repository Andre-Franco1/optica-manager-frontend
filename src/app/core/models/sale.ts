import { CardBrand } from "../enums/card-brand";
import { PaymentMethod } from "../enums/payment-method";
import { Status } from "../enums/status";
import { Client } from "./client";
import { SaleItem } from "./sale-item";
import { User } from "./user";

export interface Sale {
    id: number;
    issueDate: Date;
    estimatedDeliveryDate: Date;
    deliveryDate: Date;
    paymentMethod: PaymentMethod;
    cardBrand: CardBrand;
    installments: number;
    totalAmount: number;
    description: string;
    status: Status;

    client: Client;
    user: User;

    saleItems: SaleItem[];

}