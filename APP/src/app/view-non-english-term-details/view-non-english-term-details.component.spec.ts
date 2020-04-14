import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNonEnglishTermDetailsComponent } from './view-non-english-term-details.component';

describe('ViewNonEnglishTermDetailsComponent', () => {
  let component: ViewNonEnglishTermDetailsComponent;
  let fixture: ComponentFixture<ViewNonEnglishTermDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNonEnglishTermDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNonEnglishTermDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
