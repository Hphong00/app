import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOrderItemProduct, NewOrderItemProduct } from '../order-item-product.model';

export type PartialUpdateOrderItemProduct = Partial<IOrderItemProduct> & Pick<IOrderItemProduct, 'id'>;

export type EntityResponseType = HttpResponse<IOrderItemProduct>;
export type EntityArrayResponseType = HttpResponse<IOrderItemProduct[]>;

@Injectable({ providedIn: 'root' })
export class OrderItemProductService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/order-item-products');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(orderItemProduct: NewOrderItemProduct): Observable<EntityResponseType> {
    return this.http.post<IOrderItemProduct>(this.resourceUrl, orderItemProduct, { observe: 'response' });
  }

  update(orderItemProduct: IOrderItemProduct): Observable<EntityResponseType> {
    return this.http.put<IOrderItemProduct>(
      `${this.resourceUrl}/${this.getOrderItemProductIdentifier(orderItemProduct)}`,
      orderItemProduct,
      { observe: 'response' }
    );
  }

  partialUpdate(orderItemProduct: PartialUpdateOrderItemProduct): Observable<EntityResponseType> {
    return this.http.patch<IOrderItemProduct>(
      `${this.resourceUrl}/${this.getOrderItemProductIdentifier(orderItemProduct)}`,
      orderItemProduct,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IOrderItemProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrderItemProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOrderItemProductIdentifier(orderItemProduct: Pick<IOrderItemProduct, 'id'>): string {
    return orderItemProduct.id;
  }

  compareOrderItemProduct(o1: Pick<IOrderItemProduct, 'id'> | null, o2: Pick<IOrderItemProduct, 'id'> | null): boolean {
    return o1 && o2 ? this.getOrderItemProductIdentifier(o1) === this.getOrderItemProductIdentifier(o2) : o1 === o2;
  }

  addOrderItemProductToCollectionIfMissing<Type extends Pick<IOrderItemProduct, 'id'>>(
    orderItemProductCollection: Type[],
    ...orderItemProductsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const orderItemProducts: Type[] = orderItemProductsToCheck.filter(isPresent);
    if (orderItemProducts.length > 0) {
      const orderItemProductCollectionIdentifiers = orderItemProductCollection.map(
        orderItemProductItem => this.getOrderItemProductIdentifier(orderItemProductItem)!
      );
      const orderItemProductsToAdd = orderItemProducts.filter(orderItemProductItem => {
        const orderItemProductIdentifier = this.getOrderItemProductIdentifier(orderItemProductItem);
        if (orderItemProductCollectionIdentifiers.includes(orderItemProductIdentifier)) {
          return false;
        }
        orderItemProductCollectionIdentifiers.push(orderItemProductIdentifier);
        return true;
      });
      return [...orderItemProductsToAdd, ...orderItemProductCollection];
    }
    return orderItemProductCollection;
  }
}
