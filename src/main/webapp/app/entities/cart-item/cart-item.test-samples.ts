import { ICartItem, NewCartItem } from './cart-item.model';

export const sampleWithRequiredData: ICartItem = {
  id: '707834c0-7635-4f83-8c94-f5ac98a8bea2',
};

export const sampleWithPartialData: ICartItem = {
  id: '21c44282-d946-47da-8a48-0637acd10f44',
  cartId: 'd36b9924-5f8f-46c0-a1eb-d1b1947ba001',
};

export const sampleWithFullData: ICartItem = {
  id: '437cecd0-a745-4270-9c07-3961109caa3d',
  cartId: '460238ba-d0de-4f48-8895-cf7341ef0615',
  productId: 'd5121b04-1b76-4a44-8eb3-b00be98f5cac',
  quantity: 73158,
};

export const sampleWithNewData: NewCartItem = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
