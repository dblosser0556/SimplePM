import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetComponent } from './budget.component';
import { BudgetService } from '../../services';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';
import { AppBootstrapModule } from '../../appbootstrapmodule';

@NgModule({
    imports:      [CommonModule, FormsModule, ReactiveFormsModule,  BrowserAnimationsModule, NgxChartsModule, AppBootstrapModule ],
    declarations: [
        BudgetComponent,
        BudgetDetailComponent,
    ],
    entryComponents: [BudgetComponent, 
        BudgetDetailComponent],
    exports:      [
     BudgetComponent,
     BudgetDetailComponent
    ],
        providers:    [BudgetService]
  })
  export class BudgetModule { }

