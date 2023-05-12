export interface IOrder {
  id: string;
  userId?: string | null;
  shippingId?: string | null;
  paymentId?: string | null;
}

export type NewOrder = Omit<IOrder, 'id'> & { id: null };
