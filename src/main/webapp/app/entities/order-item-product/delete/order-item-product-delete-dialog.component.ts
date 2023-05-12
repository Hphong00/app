import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrderItemProduct } from '../order-item-product.model';
import { OrderItemProductService } from '../service/order-item-product.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './order-item-product-delete-dialog.component.html',
})
export class OrderItemProductDeleteDialogComponent {
  orderItemProduct?: IOrderItemProduct;

  constructor(protected orderItemProductService: OrderItemProductService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.orderItemProductService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
