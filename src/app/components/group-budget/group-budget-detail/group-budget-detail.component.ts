import { Component, OnInit, OnChanges } from '@angular/core';
import { GroupBudget, BudgetType } from '../../../models';
import { Subject } from 'rxjs/Subject';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupBudgetService, ErrorMsgService, ToastrType } from '../../../services';
import { BsModalRef } from 'ngx-bootstrap/modal';

export interface CreateBudget {
  groupId: number;
  budgetType: BudgetType;
  budgetYear: number;
  approvedDateTime: string;
  amount: number;

}

@Component({
  selector: 'app-group-budget-detail',
  templateUrl: './group-budget-detail.component.html',
  styleUrls: ['./group-budget-detail.component.css']
})
export class GroupBudgetDetailComponent implements OnInit, OnChanges {
  title: string;
  budget: GroupBudget;
  colorTheme = 'theme-blue';
  public onClose: Subject<GroupBudget>;
  bsConfig: Partial<BsDatepickerConfig>;

  budgetForm: FormGroup;
  error: any;

  constructor(private budgetService: GroupBudgetService,
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private errMsg: ErrorMsgService) {
     
     }

  ngOnInit() {
    this.bsConfig = Object.assign({}, {
      containerClass: this.colorTheme,
      dateInputFormat: 'YYYY-MM-DD',
      dateOutputFormat: 'YYYY-MM-DD'
    });
    this.createForm();
    this.onClose = new Subject();
    if (this.budget.budgetType === BudgetType.Capital) {
      this.title = (this.budget.groupId === null) ? 'Add Capital Budget' : 'Update Capital Budget';
    } else {
      this.title = (this.budget.groupId === null) ? 'Add Expense Budget' : 'Update Expense Budget';
    }
    this.ngOnChanges();
  }

  ngOnChanges() {
    this.budgetForm.reset( {
      groupBudgetId: this.budget.groupBudgetId,
      groupId: this.budget.groupId,
      budgetType: this.budget.budgetType,
      budgetYear: this.budget.budgetYear,
      approvedDateTime: this.budget.approvedDateTime,
      amount: this.budget.amount} );
  }


  onSubmit() {
    this.budgetForm.updateValueAndValidity();
    if (this.budgetForm.invalid) {
      return;
    }

    let budget: GroupBudget = this.getBudgetFromFormValue(this.budgetForm.value);
    if (budget.groupBudgetId !== null) {
      this.budgetService.update(budget.groupBudgetId, budget).subscribe(data => {
      this.errMsg.showUserMessage(ToastrType.info, 'Success', 'Budget has been updated');
      this.budget = data;
      this.onClose.next(this.budget);
      this.bsModalRef.hide();
      },
      error => this.errMsg.changeMessage(error));
    } else {
      const newBudget: CreateBudget = {
        groupId: budget.groupId,
        budgetType: budget.budgetType,
        budgetYear: budget.budgetYear,
        approvedDateTime: budget.approvedDateTime,
        amount: budget.amount};

      this.budgetService.create(JSON.stringify(newBudget)).subscribe(data => {
        // this.resetForm();
        budget = data.json();
        this.errMsg.showUserMessage(ToastrType.info, 'Success', 'Budget has been added');
        this.onClose.next(budget);
        this.bsModalRef.hide();
      },
      error => this.errMsg.changeMessage(error));
    }
  }


  getBudgetFromFormValue(formValue: any): GroupBudget {
    let budget: GroupBudget;
    budget = new GroupBudget();

    budget.groupBudgetId = formValue.groupBudgetId;
    budget.groupId = formValue.groupId;
    budget.budgetType = formValue.budgetType;
    budget.approvedDateTime = formValue.approvedDateTime;
    budget.budgetYear = formValue.budgetYear;
    budget.amount = formValue.amount;
    return budget;

  }

  createForm() {
    this.budgetForm = this.fb.group({
      groupBudgetId: '',
      groupId: '',
      budgetType: '',
      budgetYear: '',
      approvedDateTime: ['', Validators.required],
      amount: ['', Validators.required]
    }
    );
  }


  revert() {this.ngOnChanges(); }

  cancel() {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }


}
