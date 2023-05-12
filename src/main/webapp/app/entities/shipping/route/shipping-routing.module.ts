import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ShippingComponent } from '../list/shipping.component';
import { ShippingDetailComponent } from '../detail/shipping-detail.component';
import { ShippingUpdateComponent } from '../update/shipping-update.component';
import { ShippingRoutingResolveService } from './shipping-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const shippingRoute: Routes = [
  {
    path: '',
    component: ShippingComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ShippingDetailComponent,
    resolve: {
      shipping: ShippingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ShippingUpdateComponent,
    resolve: {
      shipping: ShippingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ShippingUpdateComponent,
    resolve: {
      shipping: ShippingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(shippingRoute)],
  exports: [RouterModule],
})
export class ShippingRoutingModule {}
