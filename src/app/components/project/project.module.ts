import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../../modules/shared.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectMonthlyDetailComponent } from './project-monthly-detail/project-monthly-detail.component';
import { CommandMenuComponent} from './project-monthly-detail/command-menu-component';
import { ProjectComponent } from './project.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectCardSummaryComponent } from './project-card-summary/project-card-summary.component';
import { ProjectChartComponent } from './project-chart/project-chart.component';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ProjectService} from '../../services';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProjectCardMonthlySummaryComponent } from './project-card-monthly-summary/project-card-monthly-summary.component';



@NgModule({
  imports:      [CommonModule, FormsModule, ReactiveFormsModule, BsDropdownModule,
    BsDatepickerModule, TabsModule, TooltipModule, SharedModule, BrowserAnimationsModule, NgxChartsModule ],
  declarations: [
    ProjectComponent,
    ProjectDetailComponent,
    ProjectMonthlyDetailComponent,
    ProjectCardComponent,
    ProjectCardSummaryComponent,
    ProjectChartComponent,
    CommandMenuComponent,
    ProjectCardMonthlySummaryComponent],
  exports:      [
    ProjectComponent,
    ProjectDetailComponent,
    ProjectMonthlyDetailComponent,
    ProjectCardComponent,
    ProjectCardSummaryComponent,
    ProjectChartComponent,
  ],
      providers:    [ProjectService]
})
export class ProjectModule { }
