import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtherTermComponent } from './create-other-term.component';

describe('CreateOtherTermComponent', () => {
  let component: CreateOtherTermComponent;
  let fixture: ComponentFixture<CreateOtherTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOtherTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOtherTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
