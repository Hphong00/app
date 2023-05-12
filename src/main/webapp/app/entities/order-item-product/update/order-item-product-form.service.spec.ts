import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../order-item-product.test-samples';

import { OrderItemProductFormService } from './order-item-product-form.service';

describe('OrderItemProduct Form Service', () => {
  let service: OrderItemProductFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderItemProductFormService);
  });

  describe('Service methods', () => {
    describe('createOrderItemProductFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOrderItemProductFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            orderItemId: expect.any(Object),
            productId: expect.any(Object),
            quantity: expect.any(Object),
          })
        );
      });

      it('passing IOrderItemProduct should create a new form with FormGroup', () => {
        const formGroup = service.createOrderItemProductFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            orderItemId: expect.any(Object),
            productId: expect.any(Object),
            quantity: expect.any(Object),
          })
        );
      });
    });

    describe('getOrderItemProduct', () => {
      it('should return NewOrderItemProduct for default OrderItemProduct initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createOrderItemProductFormGroup(sampleWithNewData);

        const orderItemProduct = service.getOrderItemProduct(formGroup) as any;

        expect(orderItemProduct).toMatchObject(sampleWithNewData);
      });

      it('should return NewOrderItemProduct for empty OrderItemProduct initial value', () => {
        const formGroup = service.createOrderItemProductFormGroup();

        const orderItemProduct = service.getOrderItemProduct(formGroup) as any;

        expect(orderItemProduct).toMatchObject({});
      });

      it('should return IOrderItemProduct', () => {
        const formGroup = service.createOrderItemProductFormGroup(sampleWithRequiredData);

        const orderItemProduct = service.getOrderItemProduct(formGroup) as any;

        expect(orderItemProduct).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOrderItemProduct should not enable id FormControl', () => {
        const formGroup = service.createOrderItemProductFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOrderItemProduct should disable id FormControl', () => {
        const formGroup = service.createOrderItemProductFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
