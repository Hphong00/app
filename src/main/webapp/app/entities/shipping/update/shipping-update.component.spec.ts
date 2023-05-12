import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ShippingFormService } from './shipping-form.service';
import { ShippingService } from '../service/shipping.service';
import { IShipping } from '../shipping.model';

import { ShippingUpdateComponent } from './shipping-update.component';

describe('Shipping Management Update Component', () => {
  let comp: ShippingUpdateComponent;
  let fixture: ComponentFixture<ShippingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let shippingFormService: ShippingFormService;
  let shippingService: ShippingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ShippingUpdateComponent],
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
      .overrideTemplate(ShippingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ShippingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    shippingFormService = TestBed.inject(ShippingFormService);
    shippingService = TestBed.inject(ShippingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const shipping: IShipping = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };

      activatedRoute.data = of({ shipping });
      comp.ngOnInit();

      expect(comp.shipping).toEqual(shipping);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShipping>>();
      const shipping = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(shippingFormService, 'getShipping').mockReturnValue(shipping);
      jest.spyOn(shippingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shipping });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shipping }));
      saveSubject.complete();

      // THEN
      expect(shippingFormService.getShipping).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(shippingService.update).toHaveBeenCalledWith(expect.objectContaining(shipping));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShipping>>();
      const shipping = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(shippingFormService, 'getShipping').mockReturnValue({ id: null });
      jest.spyOn(shippingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shipping: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shipping }));
      saveSubject.complete();

      // THEN
      expect(shippingFormService.getShipping).toHaveBeenCalled();
      expect(shippingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IShipping>>();
      const shipping = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(shippingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shipping });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(shippingService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
