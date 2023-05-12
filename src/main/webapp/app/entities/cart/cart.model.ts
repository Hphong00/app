export interface ICart {
  id: string;
  userId?: string | null;
}

export type NewCart = Omit<ICart, 'id'> & { id: null };
