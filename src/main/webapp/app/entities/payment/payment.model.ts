export interface IPayment {
  id: string;
  userId?: string | null;
  cardNumber?: string | null;
  cardHolderName?: string | null;
  cardExpirationMonth?: number | null;
  cardExpirationYear?: number | null;
  cardCVV?: string | null;
}

export type NewPayment = Omit<IPayment, 'id'> & { id: null };
