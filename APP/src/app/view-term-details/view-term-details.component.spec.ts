import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTermDetailsComponent } from './view-term-details.component';

describe('ViewTermDetailsComponent', () => {
  let component: ViewTermDetailsComponent;
  let fixture: ComponentFixture<ViewTermDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTermDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTermDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
