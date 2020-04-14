import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEnglishTermsComponent } from './view-english-terms.component';

describe('ViewEnglishTermsComponent', () => {
  let component: ViewEnglishTermsComponent;
  let fixture: ComponentFixture<ViewEnglishTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEnglishTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEnglishTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
