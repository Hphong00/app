import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShippingDetailComponent } from './shipping-detail.component';

describe('Shipping Management Detail Component', () => {
  let comp: ShippingDetailComponent;
  let fixture: ComponentFixture<ShippingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ shipping: { id: '9fec3727-3421-4967-b213-ba36557ca194' } }) },
        },
      ],
    })
      .overrideTemplate(ShippingDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ShippingDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load shipping on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.shipping).toEqual(expect.objectContaining({ id: '9fec3727-3421-4967-b213-ba36557ca194' }));
    });
  });
});
