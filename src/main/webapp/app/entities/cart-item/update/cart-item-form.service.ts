import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICartItem, NewCartItem } from '../cart-item.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICartItem for edit and NewCartItemFormGroupInput for create.
 */
type CartItemFormGroupInput = ICartItem | PartialWithRequiredKeyOf<NewCartItem>;

type CartItemFormDefaults = Pick<NewCartItem, 'id'>;

type CartItemFormGroupContent = {
  id: FormControl<ICartItem['id'] | NewCartItem['id']>;
  cartId: FormControl<ICartItem['cartId']>;
  productId: FormControl<ICartItem['productId']>;
  quantity: FormControl<ICartItem['quantity']>;
};

export type CartItemFormGroup = FormGroup<CartItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CartItemFormService {
  createCartItemFormGroup(cartItem: CartItemFormGroupInput = { id: null }): CartItemFormGroup {
    const cartItemRawValue = {
      ...this.getFormDefaults(),
      ...cartItem,
    };
    return new FormGroup<CartItemFormGroupContent>({
      id: new FormControl(
        { value: cartItemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cartId: new FormControl(cartItemRawValue.cartId),
      productId: new FormControl(cartItemRawValue.productId),
      quantity: new FormControl(cartItemRawValue.quantity),
    });
  }

  getCartItem(form: CartItemFormGroup): ICartItem | NewCartItem {
    return form.getRawValue() as ICartItem | NewCartItem;
  }

  resetForm(form: CartItemFormGroup, cartItem: CartItemFormGroupInput): void {
    const cartItemRawValue = { ...this.getFormDefaults(), ...cartItem };
    form.reset(
      {
        ...cartItemRawValue,
        id: { value: cartItemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CartItemFormDefaults {
    return {
      id: null,
    };
  }
}
