export enum CardBrand {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  ELO = 'ELO',
  HIPERCARD = 'HIPERCARD',
  AMERICAN_EXPRESS = 'AMERICAN_EXPRESS'
}

export const CardBrandLabels: Record<CardBrand, string> = {
  [CardBrand.VISA]: 'Visa',
  [CardBrand.MASTERCARD]: 'Mastercard',
  [CardBrand.ELO]: 'Elo',
  [CardBrand.HIPERCARD]: 'Hipercard',
  [CardBrand.AMERICAN_EXPRESS]: 'American Express'
};