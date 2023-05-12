import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ShippingFormService, ShippingFormGroup } from './shipping-form.service';
import { IShipping } from '../shipping.model';
import { ShippingService } from '../service/shipping.service';

@Component({
  selector: 'jhi-shipping-update',
  templateUrl: './shipping-update.component.html',
})
export class ShippingUpdateComponent implements OnInit {
  isSaving = false;
  shipping: IShipping | null = null;

  editForm: ShippingFormGroup = this.shippingFormService.createShippingFormGroup();

  constructor(
    protected shippingService: ShippingService,
    protected shippingFormService: ShippingFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shipping }) => {
      this.shipping = shipping;
      if (shipping) {
        this.updateForm(shipping);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shipping = this.shippingFormService.getShipping(this.editForm);
    if (shipping.id !== null) {
      this.subscribeToSaveResponse(this.shippingService.update(shipping));
    } else {
      this.subscribeToSaveResponse(this.shippingService.create(shipping));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShipping>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(shipping: IShipping): void {
    this.shipping = shipping;
    this.shippingFormService.resetForm(this.editForm, shipping);
  }
}
