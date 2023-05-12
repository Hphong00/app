export interface IProduct {
  id: string;
  name?: string | null;
  description?: string | null;
  price?: number | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
