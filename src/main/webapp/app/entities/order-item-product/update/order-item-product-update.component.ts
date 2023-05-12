import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { OrderItemProductFormService, OrderItemProductFormGroup } from './order-item-product-form.service';
import { IOrderItemProduct } from '../order-item-product.model';
import { OrderItemProductService } from '../service/order-item-product.service';

@Component({
  selector: 'jhi-order-item-product-update',
  templateUrl: './order-item-product-update.component.html',
})
export class OrderItemProductUpdateComponent implements OnInit {
  isSaving = false;
  orderItemProduct: IOrderItemProduct | null = null;

  editForm: OrderItemProductFormGroup = this.orderItemProductFormService.createOrderItemProductFormGroup();

  constructor(
    protected orderItemProductService: OrderItemProductService,
    protected orderItemProductFormService: OrderItemProductFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderItemProduct }) => {
      this.orderItemProduct = orderItemProduct;
      if (orderItemProduct) {
        this.updateForm(orderItemProduct);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const orderItemProduct = this.orderItemProductFormService.getOrderItemProduct(this.editForm);
    if (orderItemProduct.id !== null) {
      this.subscribeToSaveResponse(this.orderItemProductService.update(orderItemProduct));
    } else {
      this.subscribeToSaveResponse(this.orderItemProductService.create(orderItemProduct));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderItemProduct>>): void {
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

  protected updateForm(orderItemProduct: IOrderItemProduct): void {
    this.orderItemProduct = orderItemProduct;
    this.orderItemProductFormService.resetForm(this.editForm, orderItemProduct);
  }
}
