import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { ProjectDetailModule } from '../project-detail/project-detail.module';
import { routing } from './dashboard.routing';
import { AuthGuard } from '../../guard/auth.guard';

import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownMenuDirective } from 'ngx-bootstrap/dropdown/bs-dropdown-menu.directive';

import { ProjectService } from '../configuration/project/project.service';

import {HomeComponent,
  DivisionsComponent,
  ProgramsComponent,
  ProjectsComponent,
  ProjectComponent,
  RootComponent,
  ProjectMonthlyDetailComponent,
  CommandMenuComponent,
  ProjectCardComponent
 } from '../dashboard';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    SharedModule,
    ProjectDetailModule,
    ReactiveFormsModule,
    BsDropdownModule,
    AlertModule,
    BsDropdownModule,
    BsDatepickerModule,
    TabsModule,
    TooltipModule
  ],
  declarations: [ HomeComponent,
    DivisionsComponent,
    ProgramsComponent,
    ProjectsComponent,
    ProjectComponent,
    RootComponent,
    ProjectMonthlyDetailComponent,
    CommandMenuComponent,
    ProjectCardComponent],
  providers: [AuthGuard, ProjectService ]
})
export class DashboardModule { }
