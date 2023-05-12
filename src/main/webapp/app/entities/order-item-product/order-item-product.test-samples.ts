import { IOrderItemProduct, NewOrderItemProduct } from './order-item-product.model';

export const sampleWithRequiredData: IOrderItemProduct = {
  id: 'e77b1c7b-ebf8-4ddd-a7cf-f6977f709105',
};

export const sampleWithPartialData: IOrderItemProduct = {
  id: '975e1d7e-05c5-4257-bb8a-cd81602b3c18',
  orderItemId: 'fe951b80-162e-4aa2-bbca-65f0dd03929b',
};

export const sampleWithFullData: IOrderItemProduct = {
  id: 'd8367665-2821-4f90-9338-3530fe220997',
  orderItemId: '4f149cf5-b19a-442a-bb8b-1c1688d75935',
  productId: '48d61dab-aa96-40f2-a7b0-c6a250ff9991',
  quantity: 42728,
};

export const sampleWithNewData: NewOrderItemProduct = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
