import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../shipping.test-samples';

import { ShippingFormService } from './shipping-form.service';

describe('Shipping Form Service', () => {
  let service: ShippingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingFormService);
  });

  describe('Service methods', () => {
    describe('createShippingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createShippingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            userId: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            phone: expect.any(Object),
            address: expect.any(Object),
            city: expect.any(Object),
            state: expect.any(Object),
            country: expect.any(Object),
            postalCode: expect.any(Object),
          })
        );
      });

      it('passing IShipping should create a new form with FormGroup', () => {
        const formGroup = service.createShippingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            userId: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            phone: expect.any(Object),
            address: expect.any(Object),
            city: expect.any(Object),
            state: expect.any(Object),
            country: expect.any(Object),
            postalCode: expect.any(Object),
          })
        );
      });
    });

    describe('getShipping', () => {
      it('should return NewShipping for default Shipping initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createShippingFormGroup(sampleWithNewData);

        const shipping = service.getShipping(formGroup) as any;

        expect(shipping).toMatchObject(sampleWithNewData);
      });

      it('should return NewShipping for empty Shipping initial value', () => {
        const formGroup = service.createShippingFormGroup();

        const shipping = service.getShipping(formGroup) as any;

        expect(shipping).toMatchObject({});
      });

      it('should return IShipping', () => {
        const formGroup = service.createShippingFormGroup(sampleWithRequiredData);

        const shipping = service.getShipping(formGroup) as any;

        expect(shipping).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IShipping should not enable id FormControl', () => {
        const formGroup = service.createShippingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewShipping should disable id FormControl', () => {
        const formGroup = service.createShippingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
