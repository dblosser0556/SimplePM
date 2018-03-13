import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../modules/shared.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectMonthlyDetailComponent } from './project-monthly-detail/project-monthly-detail.component';
import { CommandMenuComponent} from './project-monthly-detail/command-menu-component';
import { ProjectComponent } from './project.component';

import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ProjectService} from '../../services';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';



@NgModule({
  imports:      [CommonModule, FormsModule, ReactiveFormsModule, AlertModule, BsDropdownModule,
    BsDatepickerModule, TabsModule, TooltipModule, SharedModule ],
  declarations: [ProjectComponent, ProjectDetailComponent, ProjectMonthlyDetailComponent, CommandMenuComponent],
  exports:      [ProjectComponent, ProjectDetailComponent, ProjectMonthlyDetailComponent, CommandMenuComponent],
  providers:    [ProjectService]
})
export class ProjectModule { }
