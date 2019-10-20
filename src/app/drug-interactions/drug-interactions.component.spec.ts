import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugInteractionsComponent } from './drug-interactions.component';

describe('DrugInteractionsComponent', () => {
  let component: DrugInteractionsComponent;
  let fixture: ComponentFixture<DrugInteractionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugInteractionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugInteractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
