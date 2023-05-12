export interface IShipping {
  id: string;
  userId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
}

export type NewShipping = Omit<IShipping, 'id'> & { id: null };
