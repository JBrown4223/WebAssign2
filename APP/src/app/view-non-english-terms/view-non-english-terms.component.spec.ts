import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNonEnglishTermsComponent } from './view-non-english-terms.component';

describe('ViewNonEnglishTermsComponent', () => {
  let component: ViewNonEnglishTermsComponent;
  let fixture: ComponentFixture<ViewNonEnglishTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNonEnglishTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNonEnglishTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
