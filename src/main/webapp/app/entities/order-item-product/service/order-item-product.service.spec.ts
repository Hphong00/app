import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOrderItemProduct } from '../order-item-product.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../order-item-product.test-samples';

import { OrderItemProductService } from './order-item-product.service';

const requireRestSample: IOrderItemProduct = {
  ...sampleWithRequiredData,
};

describe('OrderItemProduct Service', () => {
  let service: OrderItemProductService;
  let httpMock: HttpTestingController;
  let expectedResult: IOrderItemProduct | IOrderItemProduct[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OrderItemProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a OrderItemProduct', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const orderItemProduct = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(orderItemProduct).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OrderItemProduct', () => {
      const orderItemProduct = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(orderItemProduct).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OrderItemProduct', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OrderItemProduct', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a OrderItemProduct', () => {
      const expected = true;

      service.delete('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOrderItemProductToCollectionIfMissing', () => {
      it('should add a OrderItemProduct to an empty array', () => {
        const orderItemProduct: IOrderItemProduct = sampleWithRequiredData;
        expectedResult = service.addOrderItemProductToCollectionIfMissing([], orderItemProduct);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(orderItemProduct);
      });

      it('should not add a OrderItemProduct to an array that contains it', () => {
        const orderItemProduct: IOrderItemProduct = sampleWithRequiredData;
        const orderItemProductCollection: IOrderItemProduct[] = [
          {
            ...orderItemProduct,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOrderItemProductToCollectionIfMissing(orderItemProductCollection, orderItemProduct);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OrderItemProduct to an array that doesn't contain it", () => {
        const orderItemProduct: IOrderItemProduct = sampleWithRequiredData;
        const orderItemProductCollection: IOrderItemProduct[] = [sampleWithPartialData];
        expectedResult = service.addOrderItemProductToCollectionIfMissing(orderItemProductCollection, orderItemProduct);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(orderItemProduct);
      });

      it('should add only unique OrderItemProduct to an array', () => {
        const orderItemProductArray: IOrderItemProduct[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const orderItemProductCollection: IOrderItemProduct[] = [sampleWithRequiredData];
        expectedResult = service.addOrderItemProductToCollectionIfMissing(orderItemProductCollection, ...orderItemProductArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const orderItemProduct: IOrderItemProduct = sampleWithRequiredData;
        const orderItemProduct2: IOrderItemProduct = sampleWithPartialData;
        expectedResult = service.addOrderItemProductToCollectionIfMissing([], orderItemProduct, orderItemProduct2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(orderItemProduct);
        expect(expectedResult).toContain(orderItemProduct2);
      });

      it('should accept null and undefined values', () => {
        const orderItemProduct: IOrderItemProduct = sampleWithRequiredData;
        expectedResult = service.addOrderItemProductToCollectionIfMissing([], null, orderItemProduct, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(orderItemProduct);
      });

      it('should return initial array if no OrderItemProduct is added', () => {
        const orderItemProductCollection: IOrderItemProduct[] = [sampleWithRequiredData];
        expectedResult = service.addOrderItemProductToCollectionIfMissing(orderItemProductCollection, undefined, null);
        expect(expectedResult).toEqual(orderItemProductCollection);
      });
    });

    describe('compareOrderItemProduct', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOrderItemProduct(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = null;

        const compareResult1 = service.compareOrderItemProduct(entity1, entity2);
        const compareResult2 = service.compareOrderItemProduct(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };

        const compareResult1 = service.compareOrderItemProduct(entity1, entity2);
        const compareResult2 = service.compareOrderItemProduct(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };

        const compareResult1 = service.compareOrderItemProduct(entity1, entity2);
        const compareResult2 = service.compareOrderItemProduct(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
