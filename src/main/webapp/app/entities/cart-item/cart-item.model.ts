export interface ICartItem {
  id: string;
  cartId?: string | null;
  productId?: string | null;
  quantity?: number | null;
}

export type NewCartItem = Omit<ICartItem, 'id'> & { id: null };
