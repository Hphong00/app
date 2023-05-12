import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OrderItemProductFormService } from './order-item-product-form.service';
import { OrderItemProductService } from '../service/order-item-product.service';
import { IOrderItemProduct } from '../order-item-product.model';

import { OrderItemProductUpdateComponent } from './order-item-product-update.component';

describe('OrderItemProduct Management Update Component', () => {
  let comp: OrderItemProductUpdateComponent;
  let fixture: ComponentFixture<OrderItemProductUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let orderItemProductFormService: OrderItemProductFormService;
  let orderItemProductService: OrderItemProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [OrderItemProductUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(OrderItemProductUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OrderItemProductUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    orderItemProductFormService = TestBed.inject(OrderItemProductFormService);
    orderItemProductService = TestBed.inject(OrderItemProductService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const orderItemProduct: IOrderItemProduct = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };

      activatedRoute.data = of({ orderItemProduct });
      comp.ngOnInit();

      expect(comp.orderItemProduct).toEqual(orderItemProduct);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOrderItemProduct>>();
      const orderItemProduct = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(orderItemProductFormService, 'getOrderItemProduct').mockReturnValue(orderItemProduct);
      jest.spyOn(orderItemProductService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ orderItemProduct });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: orderItemProduct }));
      saveSubject.complete();

      // THEN
      expect(orderItemProductFormService.getOrderItemProduct).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(orderItemProductService.update).toHaveBeenCalledWith(expect.objectContaining(orderItemProduct));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOrderItemProduct>>();
      const orderItemProduct = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(orderItemProductFormService, 'getOrderItemProduct').mockReturnValue({ id: null });
      jest.spyOn(orderItemProductService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ orderItemProduct: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: orderItemProduct }));
      saveSubject.complete();

      // THEN
      expect(orderItemProductFormService.getOrderItemProduct).toHaveBeenCalled();
      expect(orderItemProductService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOrderItemProduct>>();
      const orderItemProduct = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(orderItemProductService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ orderItemProduct });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(orderItemProductService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
