export interface IOrderItem {
  id: string;
  orderId?: string | null;
  productId?: string | null;
  quantity?: number | null;
}

export type NewOrderItem = Omit<IOrderItem, 'id'> & { id: null };
