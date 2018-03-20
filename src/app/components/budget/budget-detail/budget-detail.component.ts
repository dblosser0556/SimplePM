import { Component, OnInit, Input, Output, OnChanges} from '@angular/core';
import { Budget, BudgetType } from '../../../models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BudgetService, ToastrType } from '../../../services';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ErrorMsgService } from '../../../services';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

export interface CreateBudget {
  projectId: number;
  budgetType: BudgetType;
  approvedDateTime: string;
  amount: number;

}

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.css']
})


export class BudgetDetailComponent implements OnInit, OnChanges {

  title: string;
  budget: Budget;
  colorTheme = 'theme-blue';
  public onClose: Subject<Budget>;
  bsConfig: Partial<BsDatepickerConfig>;

  budgetForm: FormGroup;
  error: any;

  constructor(private budgetService: BudgetService,
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
      this.title = (this.budget.budgetId === null) ? 'Add Capital Budget' : 'Update Capital Budget';
    } else {
      this.title = (this.budget.budgetId === null) ? 'Add Expense Budget' : 'Update Expense Budget';
    }
    this.ngOnChanges();
  }

  ngOnChanges() {
    this.budgetForm.reset( {
      budgetId: this.budget.budgetId,
      projectId: this.budget.projectId,
      budgetType: this.budget.budgetType,
      approvedDateTime: this.budget.approvedDateTime,
      amount: this.budget.amount} );
  }


  onSubmit() {
    this.budgetForm.updateValueAndValidity();
    if (this.budgetForm.invalid) {
      return;
    }

    let budget: Budget = this.getBudgetFromFormValue(this.budgetForm.value);
    if (budget.budgetId !== null) {
      this.budgetService.update(budget.budgetId, budget).subscribe(data => {
      this.errMsg.showUserMessage(ToastrType.info, 'Success', 'Budget has been updated');
      this.budget = data;
      this.onClose.next(this.budget);
      this.bsModalRef.hide();
      },
      error => this.errMsg.changeMessage(error));
    } else {
      const newBudget: CreateBudget = {
        projectId: budget.projectId,
        budgetType: budget.budgetType,
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


  getBudgetFromFormValue(formValue: any): Budget {
    let budget: Budget;
    budget = new Budget();

    budget.budgetId = formValue.budgetId;
    budget.projectId = formValue.projectId;
    budget.budgetType = formValue.budgetType;
    budget.approvedDateTime = formValue.approvedDateTime;
    budget.amount = formValue.amount;
    return budget;

  }

  createForm() {
    this.budgetForm = this.fb.group({
      budgetId: this.budget.budgetId,
      projectId: this.budget.projectId,
      budgetType: this.budget.budgetType,
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
