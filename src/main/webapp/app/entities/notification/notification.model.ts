export interface INotification {
  id: string;
  userId?: string | null;
  orderId?: string | null;
  message?: string | null;
  type?: string | null;
  isRead?: boolean | null;
}

export type NewNotification = Omit<INotification, 'id'> & { id: null };
