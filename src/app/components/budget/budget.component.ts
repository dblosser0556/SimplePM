import { Component, OnInit, Input } from '@angular/core';
import { Budget, BudgetType } from '../../models';
import { BudgetService, ErrorMsgService, ToastrType } from '../../services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  budgets: Budget[];
  groupId: number;
  projectId: number;
  title: string;
  isCapital: boolean;
  onClose: Subject<Budget[]>;

  budgetDetailsModal: BsModalRef;
  selectedBudget: Budget;
  error: any;
  isLoading = false;
  budgetType: BudgetType;
  

  constructor(private budgetService: BudgetService,
    public bsModalRef: BsModalRef,
    private bsModalService: BsModalService,
    private errMsgService: ErrorMsgService
    ) {
  }

  ngOnInit() {
    this.onClose = new Subject<Budget[]>();
    if (this.isCapital) {
        this.budgetType = BudgetType.Capital;
        this.title += ' - Capital Budget';
    } else {
        this.title += ' - Expense Budget';
        this.budgetType = BudgetType.Expense;
    }
    
  }




  onDelete(id: number) {
      if (confirm('Are you sure to delete this record?') === true) {
          this.budgetService.delete(id)
              .subscribe(x => {
                this.errMsgService.showUserMessage(ToastrType.success, 'Success', 'Budget record has been deleted');
                  this.getList(this.projectId, this.isCapital);
              });
      }
  }

  getList(projectId: number, isCapital: boolean) {
      this.isLoading = true;
      const queryParams = {'$filter': 'ProjectId eq ' + projectId };
      this.budgetService.getList(queryParams)
          .subscribe(results => {
              this.budgets = results;
              this.isLoading = false;
          },
          error => this.errMsgService.changeMessage(error));
      this.selectedBudget = undefined;
  }

  addBudget(isCapital: boolean) {
    const _budget = new Budget();
    _budget.budgetId = null;
    _budget.projectId = this.projectId;
    _budget.budgetType = (isCapital) ? BudgetType.Capital : BudgetType.Expense;
    const initialState = {
      budget: _budget
    };
    this.budgetDetailsModal = this.bsModalService.show(BudgetDetailComponent, { initialState });
    this.budgetDetailsModal.content.onClose.subscribe(result => {
      console.log('results', result);
      if (result !== null) {
        this.getList(this.projectId, this.isCapital);
    }
    });
  }
  edit(budget: Budget) {
      this.selectedBudget = budget;
      const initialState = {
        budget: this.selectedBudget
      };
      this.budgetDetailsModal = this.bsModalService.show(BudgetDetailComponent, { initialState });
      this.budgetDetailsModal.content.budget = this.selectedBudget;
      this.budgetDetailsModal.content.onClose.subscribe(result => {
        console.log('results', result);
        if (result !== null) {
            this.getList(this.projectId, this.isCapital);
        }
      });
  }

  updateList(event: any) {
      this.getList(this.projectId, this.isCapital);
  }

  close() {
      this.onClose.next(this.budgets);
      this.bsModalRef.hide();

  }


}
