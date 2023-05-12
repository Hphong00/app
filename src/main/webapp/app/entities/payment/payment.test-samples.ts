import { IPayment, NewPayment } from './payment.model';

export const sampleWithRequiredData: IPayment = {
  id: '7bb75e76-458a-47ee-97c2-272eb2852f49',
};

export const sampleWithPartialData: IPayment = {
  id: 'e89be337-efa6-4a0d-b09c-e2dc746aa30f',
  userId: '9542c264-08ac-4410-8ba4-c37e9ba3dbbb',
  cardNumber: 'Unbranded',
  cardHolderName: 'payment',
  cardExpirationYear: 48506,
  cardCVV: 'SSL District',
};

export const sampleWithFullData: IPayment = {
  id: '03e265fa-7a5b-43e6-8d53-959463450cf4',
  userId: '3940261b-a6a6-4eb1-a825-d7251f6c826a',
  cardNumber: 'Tools',
  cardHolderName: 'client-driven Fish microchip',
  cardExpirationMonth: 11430,
  cardExpirationYear: 36526,
  cardCVV: 'payment IB',
};

export const sampleWithNewData: NewPayment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
