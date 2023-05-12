import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOrderItemProduct } from '../order-item-product.model';
import { OrderItemProductService } from '../service/order-item-product.service';

@Injectable({ providedIn: 'root' })
export class OrderItemProductRoutingResolveService implements Resolve<IOrderItemProduct | null> {
  constructor(protected service: OrderItemProductService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrderItemProduct | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((orderItemProduct: HttpResponse<IOrderItemProduct>) => {
          if (orderItemProduct.body) {
            return of(orderItemProduct.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
