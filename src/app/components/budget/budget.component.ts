import { Component, OnInit, Input } from '@angular/core';
import { Budget } from '../../models';
import { BudgetService } from '../../services';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  @Input() budgets: Budget[];
  @Input() groupId: number;
  @Input() projectId: number;
  @Input() title: string;

  selectedBudget: Budget;
  error: any;
  isLoading = false;
  

  constructor(private budgetService: BudgetService,
    ) {
  }

  ngOnInit() {
      this.getList();
  }




  onDelete(id: number) {
      if (confirm('Are you sure to delete this record?') === true) {
          this.budgetService.delete(id)
              .subscribe(x => {
                //  this.snackBar.open('Budget has been deleted', '', {duration: 2000});
                  this.getList();
              });
      }
  }

  getList() {
      this.isLoading = true;
      this.budgetService.getAll()
          .subscribe(results => {
              this.budgets = results;
              this.isLoading = false;
          },
          error => this.error = error);
      this.selectedBudget = undefined;
  }

  add() {
      this.selectedBudget = new Budget();
      
      this.selectedBudget.groupId = this.groupId;
      this.selectedBudget.projectId = this.projectId;
  }

  edit(budget: Budget) {
      this.selectedBudget = budget;
  }

  updateList(event: any) {
      this.getList();
  }


}