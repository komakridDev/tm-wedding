import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingCounterComponent } from './wedding-counter.component';

describe('WeddingCounterComponent', () => {
  let component: WeddingCounterComponent;
  let fixture: ComponentFixture<WeddingCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeddingCounterComponent]
    });
    fixture = TestBed.createComponent(WeddingCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
