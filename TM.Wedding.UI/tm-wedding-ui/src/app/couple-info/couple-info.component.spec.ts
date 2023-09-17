import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupleInfoComponent } from './couple-info.component';

describe('CoupleInfoComponent', () => {
  let component: CoupleInfoComponent;
  let fixture: ComponentFixture<CoupleInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoupleInfoComponent]
    });
    fixture = TestBed.createComponent(CoupleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
