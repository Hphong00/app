import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ShippingComponent } from './list/shipping.component';
import { ShippingDetailComponent } from './detail/shipping-detail.component';
import { ShippingUpdateComponent } from './update/shipping-update.component';
import { ShippingDeleteDialogComponent } from './delete/shipping-delete-dialog.component';
import { ShippingRoutingModule } from './route/shipping-routing.module';

@NgModule({
  imports: [SharedModule, ShippingRoutingModule],
  declarations: [ShippingComponent, ShippingDetailComponent, ShippingUpdateComponent, ShippingDeleteDialogComponent],
})
export class ShippingModule {}
