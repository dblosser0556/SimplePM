import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { ProjectModule } from '../project/project.module';
import { routing } from './dashboard.routing';
import { AuthGuard } from '../../guard/auth.guard';

import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownMenuDirective } from 'ngx-bootstrap/dropdown/bs-dropdown-menu.directive';



import {HomeComponent,
  DivisionsComponent,
  ProgramsComponent,
  ProjectsComponent,
  RootComponent,
  ProjectCardComponent
 } from '../dashboard';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    SharedModule,
    ProjectModule,
    ReactiveFormsModule,
    BsDropdownModule,
    AlertModule,
    BsDropdownModule,
    BsDatepickerModule,

  ],
  declarations: [ HomeComponent,
    DivisionsComponent,
    ProgramsComponent,
    ProjectsComponent,
    RootComponent,
    ProjectCardComponent],
  providers: [AuthGuard ]
})
export class DashboardModule { }
