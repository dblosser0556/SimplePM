import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Budget, BudgetType } from '../../../models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BudgetService, ToastrType } from '../../../services';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ErrorMsgService } from '../../../services';

export interface CreateBudget {
  groupId: number;
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

  budget: Budget;

  public onClose: Subject<boolean>;


  budgetForm: FormGroup;
  error: any;

  constructor(private budgetService: BudgetService,
    private _bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private errMsg: ErrorMsgService) {
     
     }

  ngOnInit() {
    this.createForm();
    this.onClose = new Subject();
  }

  ngOnChanges() {
    this.budgetForm.reset( {
      budgetID: this.budget.budgetId,
      groupId: this.budget.groupId,
      projectId: this.budget.projectId,
      budgetType: this.budget.budgetType,
      approvedDate: this.budget.approvedDateTime,
      amount: this.budget.amount} );
  }

  onSubmit() {
    this.budgetForm.updateValueAndValidity();
    if (this.budgetForm.invalid) {
      return;
    }

    const budget: Budget = this.getBudgetFromFormValue(this.budgetForm.value);
    if (budget.budgetId !== null) {
      this.budgetService.update(budget.budgetId, budget).subscribe(data => {
      this.errMsg.showUserMessage(ToastrType.info, 'Success', 'Budget has been updated');
      this.onClose.next(true);
      this._bsModalRef.hide();
      },
      error => this.errMsg.changeMessage(error));
    } else {
      const newBudget: CreateBudget = {
        groupId: budget.groupId,
        projectId: budget.projectId,
        budgetType: budget.budgetType,
        approvedDateTime: budget.approvedDateTime,
        amount: budget.amount};

      this.budgetService.create(JSON.stringify(newBudget)).subscribe(data => {
        // this.resetForm();
        this.budget = data;
        this.errMsg.showUserMessage(ToastrType.info, 'Success', 'Budget has been updated');
        this.onClose.next(true);
        this._bsModalRef.hide();
      },
      error => this.errMsg.changeMessage(error));
    }
  }


  getBudgetFromFormValue(formValue: any): Budget {
    let budget: Budget;
    budget = new Budget();

    budget.budgetId = formValue.budgetId;
    budget.projectId = formValue.budgetName;
    budget.groupId = formValue.budgetDesc;
    budget.budgetType = formValue.budgetType;
    budget.approvedDateTime = formValue.approvedDateTime;
    budget.amount = formValue.amount;
    return budget;

  }

  createForm() {
    this.budgetForm = this.fb.group({
      budgetId: '',
      groupId: this.budget.groupId,
      projectId: this.budget.projectId,
      budgetType: ['', Validators.required],
      approvedDateTime: '',
      amount: ''
    }
    );
  }


  revert() {this.ngOnChanges(); }

  cancel() {
    this.onClose.next(true);
    this._bsModalRef.hide();
  }

}
