import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: '405a8ca4-0702-4283-a860-55c933ab5156',
};

export const sampleWithPartialData: INotification = {
  id: 'c2eea45d-2b9f-4a23-b351-489256ff43ea',
  userId: '70037671-fbff-4264-9ede-53a9ac5af03d',
  orderId: 'b908a2b2-3602-4b58-8411-94145e42bf5b',
  message: 'engineer Oregon',
  isRead: false,
};

export const sampleWithFullData: INotification = {
  id: '8a2c4b2d-131e-4c1b-9dc7-e5b0c92b078a',
  userId: 'da35f294-4765-447b-8a3b-c41259f6d212',
  orderId: 'c68c4dce-17fb-4fdf-9c08-9becb44eee5d',
  message: 'support',
  type: 'back-end',
  isRead: false,
};

export const sampleWithNewData: NewNotification = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
