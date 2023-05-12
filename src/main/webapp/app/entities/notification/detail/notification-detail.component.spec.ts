import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NotificationDetailComponent } from './notification-detail.component';

describe('Notification Management Detail Component', () => {
  let comp: NotificationDetailComponent;
  let fixture: ComponentFixture<NotificationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ notification: { id: '9fec3727-3421-4967-b213-ba36557ca194' } }) },
        },
      ],
    })
      .overrideTemplate(NotificationDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NotificationDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load notification on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.notification).toEqual(expect.objectContaining({ id: '9fec3727-3421-4967-b213-ba36557ca194' }));
    });
  });
});
