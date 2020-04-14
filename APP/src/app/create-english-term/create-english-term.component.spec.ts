import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnglishTermComponent } from './create-english-term.component';

describe('CreateEnglishTermComponent', () => {
  let component: CreateEnglishTermComponent;
  let fixture: ComponentFixture<CreateEnglishTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEnglishTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEnglishTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
