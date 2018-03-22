import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBudgetDetailComponent } from './group-budget-detail.component';

describe('GroupBudgetDetailComponent', () => {
  let component: GroupBudgetDetailComponent;
  let fixture: ComponentFixture<GroupBudgetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupBudgetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupBudgetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
