import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IShipping, NewShipping } from '../shipping.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IShipping for edit and NewShippingFormGroupInput for create.
 */
type ShippingFormGroupInput = IShipping | PartialWithRequiredKeyOf<NewShipping>;

type ShippingFormDefaults = Pick<NewShipping, 'id'>;

type ShippingFormGroupContent = {
  id: FormControl<IShipping['id'] | NewShipping['id']>;
  userId: FormControl<IShipping['userId']>;
  firstName: FormControl<IShipping['firstName']>;
  lastName: FormControl<IShipping['lastName']>;
  phone: FormControl<IShipping['phone']>;
  address: FormControl<IShipping['address']>;
  city: FormControl<IShipping['city']>;
  state: FormControl<IShipping['state']>;
  country: FormControl<IShipping['country']>;
  postalCode: FormControl<IShipping['postalCode']>;
};

export type ShippingFormGroup = FormGroup<ShippingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ShippingFormService {
  createShippingFormGroup(shipping: ShippingFormGroupInput = { id: null }): ShippingFormGroup {
    const shippingRawValue = {
      ...this.getFormDefaults(),
      ...shipping,
    };
    return new FormGroup<ShippingFormGroupContent>({
      id: new FormControl(
        { value: shippingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      userId: new FormControl(shippingRawValue.userId),
      firstName: new FormControl(shippingRawValue.firstName),
      lastName: new FormControl(shippingRawValue.lastName),
      phone: new FormControl(shippingRawValue.phone),
      address: new FormControl(shippingRawValue.address),
      city: new FormControl(shippingRawValue.city),
      state: new FormControl(shippingRawValue.state),
      country: new FormControl(shippingRawValue.country),
      postalCode: new FormControl(shippingRawValue.postalCode),
    });
  }

  getShipping(form: ShippingFormGroup): IShipping | NewShipping {
    return form.getRawValue() as IShipping | NewShipping;
  }

  resetForm(form: ShippingFormGroup, shipping: ShippingFormGroupInput): void {
    const shippingRawValue = { ...this.getFormDefaults(), ...shipping };
    form.reset(
      {
        ...shippingRawValue,
        id: { value: shippingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ShippingFormDefaults {
    return {
      id: null,
    };
  }
}
