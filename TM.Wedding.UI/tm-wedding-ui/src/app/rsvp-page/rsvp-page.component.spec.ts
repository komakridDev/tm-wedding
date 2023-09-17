import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpPageComponent } from './rsvp-page.component';

describe('RsvpPageComponent', () => {
  let component: RsvpPageComponent;
  let fixture: ComponentFixture<RsvpPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RsvpPageComponent]
    });
    fixture = TestBed.createComponent(RsvpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
