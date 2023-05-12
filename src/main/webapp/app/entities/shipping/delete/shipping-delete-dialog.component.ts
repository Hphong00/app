import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IShipping } from '../shipping.model';
import { ShippingService } from '../service/shipping.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './shipping-delete-dialog.component.html',
})
export class ShippingDeleteDialogComponent {
  shipping?: IShipping;

  constructor(protected shippingService: ShippingService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.shippingService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
