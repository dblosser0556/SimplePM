import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetComponent } from './budget.component';
import { BudgetService } from '../../services';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';
import { AppBootstrapModule } from '../../appbootstrapmodule';
import { BudgetFilterPipe } from '../../filter/budget.filter';

@NgModule({
    imports:      [CommonModule, FormsModule, ReactiveFormsModule,  BrowserAnimationsModule, NgxChartsModule, AppBootstrapModule ],
    declarations: [
        BudgetComponent,
        BudgetDetailComponent,
        BudgetFilterPipe
    ],
    entryComponents: [BudgetComponent,
        BudgetDetailComponent],
    exports:      [
     BudgetComponent,
     BudgetDetailComponent,
     BudgetFilterPipe
    ],
        providers:    [BudgetService]
  })
  export class BudgetModule { }

