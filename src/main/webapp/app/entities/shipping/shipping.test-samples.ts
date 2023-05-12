import { IShipping, NewShipping } from './shipping.model';

export const sampleWithRequiredData: IShipping = {
  id: 'f2d4ed6b-0f03-4811-97cd-e27198d4faef',
};

export const sampleWithPartialData: IShipping = {
  id: '410e7fdf-ce95-4922-9528-03fa5fb473fb',
  address: 'User-centric function Franc',
  city: 'Declanfort',
  country: 'Saint Lucia',
  postalCode: 'SSL primary',
};

export const sampleWithFullData: IShipping = {
  id: '917d0278-b6ce-4832-bb82-1b4f9b2cbbed',
  userId: '000f891e-8593-4972-8fe5-4473621ef432',
  firstName: 'Tod',
  lastName: 'Satterfield',
  phone: '(455) 727-1764',
  address: 'Granite Representative',
  city: 'South Adolfmouth',
  state: 'ubiquitous',
  country: 'South Georgia and the South Sandwich Islands',
  postalCode: 'Rial',
};

export const sampleWithNewData: NewShipping = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
