import { IOrderItem, NewOrderItem } from './order-item.model';

export const sampleWithRequiredData: IOrderItem = {
  id: '9db4928b-a829-49d0-a2c6-04ecf1208cb6',
};

export const sampleWithPartialData: IOrderItem = {
  id: '66edde6e-65c5-4f87-b435-f3360285631f',
  quantity: 58281,
};

export const sampleWithFullData: IOrderItem = {
  id: '031006e6-4e81-45a5-958e-9637158007fc',
  orderId: '36a5411a-2af0-451f-bc48-6349566f76c9',
  productId: '0aee1c83-5d55-4e07-9340-ce1b72140c97',
  quantity: 17837,
};

export const sampleWithNewData: NewOrderItem = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
