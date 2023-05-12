import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IOrderItemProduct, NewOrderItemProduct } from '../order-item-product.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOrderItemProduct for edit and NewOrderItemProductFormGroupInput for create.
 */
type OrderItemProductFormGroupInput = IOrderItemProduct | PartialWithRequiredKeyOf<NewOrderItemProduct>;

type OrderItemProductFormDefaults = Pick<NewOrderItemProduct, 'id'>;

type OrderItemProductFormGroupContent = {
  id: FormControl<IOrderItemProduct['id'] | NewOrderItemProduct['id']>;
  orderItemId: FormControl<IOrderItemProduct['orderItemId']>;
  productId: FormControl<IOrderItemProduct['productId']>;
  quantity: FormControl<IOrderItemProduct['quantity']>;
};

export type OrderItemProductFormGroup = FormGroup<OrderItemProductFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OrderItemProductFormService {
  createOrderItemProductFormGroup(orderItemProduct: OrderItemProductFormGroupInput = { id: null }): OrderItemProductFormGroup {
    const orderItemProductRawValue = {
      ...this.getFormDefaults(),
      ...orderItemProduct,
    };
    return new FormGroup<OrderItemProductFormGroupContent>({
      id: new FormControl(
        { value: orderItemProductRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      orderItemId: new FormControl(orderItemProductRawValue.orderItemId),
      productId: new FormControl(orderItemProductRawValue.productId),
      quantity: new FormControl(orderItemProductRawValue.quantity),
    });
  }

  getOrderItemProduct(form: OrderItemProductFormGroup): IOrderItemProduct | NewOrderItemProduct {
    return form.getRawValue() as IOrderItemProduct | NewOrderItemProduct;
  }

  resetForm(form: OrderItemProductFormGroup, orderItemProduct: OrderItemProductFormGroupInput): void {
    const orderItemProductRawValue = { ...this.getFormDefaults(), ...orderItemProduct };
    form.reset(
      {
        ...orderItemProductRawValue,
        id: { value: orderItemProductRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OrderItemProductFormDefaults {
    return {
      id: null,
    };
  }
}
