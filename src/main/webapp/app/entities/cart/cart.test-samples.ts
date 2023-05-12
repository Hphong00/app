import { ICart, NewCart } from './cart.model';

export const sampleWithRequiredData: ICart = {
  id: '8decf029-cc1a-4fc6-b857-a64cf5a2293d',
};

export const sampleWithPartialData: ICart = {
  id: 'ca310711-6c77-4b6e-9a4a-3e88cf9b6a11',
};

export const sampleWithFullData: ICart = {
  id: 'a81aefbc-7ca7-4616-adf1-f85dcdb7d544',
  userId: '428cd73d-dc00-4ed8-833d-f2c166b2760d',
};

export const sampleWithNewData: NewCart = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
