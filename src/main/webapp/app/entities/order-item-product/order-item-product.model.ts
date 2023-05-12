export interface IOrderItemProduct {
  id: string;
  orderItemId?: string | null;
  productId?: string | null;
  quantity?: number | null;
}

export type NewOrderItemProduct = Omit<IOrderItemProduct, 'id'> & { id: null };
