import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IShipping } from '../shipping.model';
import { ShippingService } from '../service/shipping.service';

@Injectable({ providedIn: 'root' })
export class ShippingRoutingResolveService implements Resolve<IShipping | null> {
  constructor(protected service: ShippingService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShipping | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((shipping: HttpResponse<IShipping>) => {
          if (shipping.body) {
            return of(shipping.body);
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
