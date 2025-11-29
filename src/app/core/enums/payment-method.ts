export enum PaymentMethod {
    Cash = 'CASH',
    CreditCard = 'CREDIT_CARD',
    DebitCard = 'DEBIT_CARD',
    Pix = 'PIX'
}

export const PaymentMethodLabels: Record<PaymentMethod, string> = {
  [PaymentMethod.Cash]: 'Dinheiro',
  [PaymentMethod.CreditCard]: 'Cartão de Crédito',
  [PaymentMethod.DebitCard]: 'Cartão de Débito',
  [PaymentMethod.Pix]: 'Pix'
};