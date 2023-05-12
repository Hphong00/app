import { IOrder, NewOrder } from './order.model';

export const sampleWithRequiredData: IOrder = {
  id: '75b8b579-d1ae-490d-bf79-9f7f3c2b3616',
};

export const sampleWithPartialData: IOrder = {
  id: 'b84d1e44-0bf9-4737-b5d3-2e397fd522f5',
  paymentId: '0ce51292-4822-4d53-8a2e-0d8101bfa9d3',
};

export const sampleWithFullData: IOrder = {
  id: 'dda1a8bd-ca82-44ec-9afd-43f45f06ae2d',
  userId: '012def29-4056-4ad2-a7b4-db0a41b48f61',
  shippingId: '9b537c5a-9dad-45e6-b4c7-8e0350295385',
  paymentId: 'e06e2d8e-628f-4e53-a90b-e06c530c1fc4',
};

export const sampleWithNewData: NewOrder = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
