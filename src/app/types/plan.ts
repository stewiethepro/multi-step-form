export type TypeOfplan = 'monthly' | 'yearly';

export type planWithPrices = {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  }
}