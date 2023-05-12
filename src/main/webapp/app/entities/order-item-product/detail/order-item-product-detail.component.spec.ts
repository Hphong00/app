import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderItemProductDetailComponent } from './order-item-product-detail.component';

describe('OrderItemProduct Management Detail Component', () => {
  let comp: OrderItemProductDetailComponent;
  let fixture: ComponentFixture<OrderItemProductDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderItemProductDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ orderItemProduct: { id: '9fec3727-3421-4967-b213-ba36557ca194' } }) },
        },
      ],
    })
      .overrideTemplate(OrderItemProductDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OrderItemProductDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load orderItemProduct on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.orderItemProduct).toEqual(expect.objectContaining({ id: '9fec3727-3421-4967-b213-ba36557ca194' }));
    });
  });
});
