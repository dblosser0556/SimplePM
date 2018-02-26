import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../modules/shared.module';
import { ProjectDetailComponent } from './project-detail.component';

import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';




@NgModule({
  imports:      [CommonModule, FormsModule, ReactiveFormsModule, AlertModule, BsDropdownModule, BsDatepickerModule],
  declarations: [ProjectDetailComponent],
  exports:      [ProjectDetailComponent],
  providers:    []
})
export class ProjectDetailModule { }
