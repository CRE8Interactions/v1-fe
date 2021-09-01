import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveNowComponent } from './live-now.component';

describe('LiveNowComponent', () => {
  let component: LiveNowComponent;
  let fixture: ComponentFixture<LiveNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveNowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
