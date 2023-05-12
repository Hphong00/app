import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 'c442dfc5-f1e3-4a23-b568-16f6b07dcadc',
};

export const sampleWithPartialData: IProduct = {
  id: 'e6eb0573-2e9c-4d25-b153-fe3a45b5084b',
  name: 'neural frictionless payment',
  description: 'bypass',
};

export const sampleWithFullData: IProduct = {
  id: '74ca3b77-6a45-468a-a3e8-5babd435b43a',
  name: 'Qatar Account parse',
  description: 'generating',
  price: 91355,
};

export const sampleWithNewData: NewProduct = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
