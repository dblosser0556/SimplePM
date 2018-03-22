import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GroupBudgetDetailComponent } from './group-budget-detail/group-budget-detail.component';
import { GroupBudgetComponent } from './group-budget.component';
import { GroupBudgetFilterPipe } from '../../filter/group-budget.filter';
import { AppBootstrapModule } from '../../appbootstrapmodule';
import { SharedModule } from '../../modules/shared.module';
import { GroupBudgetService } from '../../services';

@NgModule({
  imports:      [CommonModule, FormsModule, ReactiveFormsModule,  BrowserAnimationsModule, AppBootstrapModule ],
  declarations: [
    GroupBudgetComponent,
    GroupBudgetDetailComponent,
    GroupBudgetFilterPipe
  ],
    entryComponents: [GroupBudgetComponent,
      GroupBudgetDetailComponent],
    exports: [
      GroupBudgetComponent,
      GroupBudgetDetailComponent,
      GroupBudgetFilterPipe
    ],
    providers: [GroupBudgetService]
})
export class GroupBudgetModule { }
