import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IShipping, NewShipping } from '../shipping.model';

export type PartialUpdateShipping = Partial<IShipping> & Pick<IShipping, 'id'>;

export type EntityResponseType = HttpResponse<IShipping>;
export type EntityArrayResponseType = HttpResponse<IShipping[]>;

@Injectable({ providedIn: 'root' })
export class ShippingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/shippings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(shipping: NewShipping): Observable<EntityResponseType> {
    return this.http.post<IShipping>(this.resourceUrl, shipping, { observe: 'response' });
  }

  update(shipping: IShipping): Observable<EntityResponseType> {
    return this.http.put<IShipping>(`${this.resourceUrl}/${this.getShippingIdentifier(shipping)}`, shipping, { observe: 'response' });
  }

  partialUpdate(shipping: PartialUpdateShipping): Observable<EntityResponseType> {
    return this.http.patch<IShipping>(`${this.resourceUrl}/${this.getShippingIdentifier(shipping)}`, shipping, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IShipping>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShipping[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getShippingIdentifier(shipping: Pick<IShipping, 'id'>): string {
    return shipping.id;
  }

  compareShipping(o1: Pick<IShipping, 'id'> | null, o2: Pick<IShipping, 'id'> | null): boolean {
    return o1 && o2 ? this.getShippingIdentifier(o1) === this.getShippingIdentifier(o2) : o1 === o2;
  }

  addShippingToCollectionIfMissing<Type extends Pick<IShipping, 'id'>>(
    shippingCollection: Type[],
    ...shippingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const shippings: Type[] = shippingsToCheck.filter(isPresent);
    if (shippings.length > 0) {
      const shippingCollectionIdentifiers = shippingCollection.map(shippingItem => this.getShippingIdentifier(shippingItem)!);
      const shippingsToAdd = shippings.filter(shippingItem => {
        const shippingIdentifier = this.getShippingIdentifier(shippingItem);
        if (shippingCollectionIdentifiers.includes(shippingIdentifier)) {
          return false;
        }
        shippingCollectionIdentifiers.push(shippingIdentifier);
        return true;
      });
      return [...shippingsToAdd, ...shippingCollection];
    }
    return shippingCollection;
  }
}
