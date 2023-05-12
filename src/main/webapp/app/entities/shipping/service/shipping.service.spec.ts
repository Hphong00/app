import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IShipping } from '../shipping.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../shipping.test-samples';

import { ShippingService } from './shipping.service';

const requireRestSample: IShipping = {
  ...sampleWithRequiredData,
};

describe('Shipping Service', () => {
  let service: ShippingService;
  let httpMock: HttpTestingController;
  let expectedResult: IShipping | IShipping[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ShippingService);
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

    it('should create a Shipping', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const shipping = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(shipping).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Shipping', () => {
      const shipping = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(shipping).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Shipping', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Shipping', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Shipping', () => {
      const expected = true;

      service.delete('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addShippingToCollectionIfMissing', () => {
      it('should add a Shipping to an empty array', () => {
        const shipping: IShipping = sampleWithRequiredData;
        expectedResult = service.addShippingToCollectionIfMissing([], shipping);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(shipping);
      });

      it('should not add a Shipping to an array that contains it', () => {
        const shipping: IShipping = sampleWithRequiredData;
        const shippingCollection: IShipping[] = [
          {
            ...shipping,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addShippingToCollectionIfMissing(shippingCollection, shipping);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Shipping to an array that doesn't contain it", () => {
        const shipping: IShipping = sampleWithRequiredData;
        const shippingCollection: IShipping[] = [sampleWithPartialData];
        expectedResult = service.addShippingToCollectionIfMissing(shippingCollection, shipping);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(shipping);
      });

      it('should add only unique Shipping to an array', () => {
        const shippingArray: IShipping[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const shippingCollection: IShipping[] = [sampleWithRequiredData];
        expectedResult = service.addShippingToCollectionIfMissing(shippingCollection, ...shippingArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const shipping: IShipping = sampleWithRequiredData;
        const shipping2: IShipping = sampleWithPartialData;
        expectedResult = service.addShippingToCollectionIfMissing([], shipping, shipping2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(shipping);
        expect(expectedResult).toContain(shipping2);
      });

      it('should accept null and undefined values', () => {
        const shipping: IShipping = sampleWithRequiredData;
        expectedResult = service.addShippingToCollectionIfMissing([], null, shipping, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(shipping);
      });

      it('should return initial array if no Shipping is added', () => {
        const shippingCollection: IShipping[] = [sampleWithRequiredData];
        expectedResult = service.addShippingToCollectionIfMissing(shippingCollection, undefined, null);
        expect(expectedResult).toEqual(shippingCollection);
      });
    });

    describe('compareShipping', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareShipping(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = null;

        const compareResult1 = service.compareShipping(entity1, entity2);
        const compareResult2 = service.compareShipping(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };

        const compareResult1 = service.compareShipping(entity1, entity2);
        const compareResult2 = service.compareShipping(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };

        const compareResult1 = service.compareShipping(entity1, entity2);
        const compareResult2 = service.compareShipping(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
