import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { ProjectDetailModule } from '../project-detail/project-detail.module';

import { routing } from './configuration.routing';

/* import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; */

import { AppBootstrapModule } from '../../appbootstrapmodule';

import { FixedPriceTypeService } from './fixed-price-type/fixed-price-type.service';
import { RoleService } from './role/role.service';
import { StatusService } from './status/status.service';
import { GroupService } from './group/group.service';
import { ResourceTypeService } from './resource-type/resource-type.service';
import { ProjectService } from './project/project.service';
import { PhaseService } from './phase/phase.service';


import {
  RootComponent,
  PhaseListComponent,
  PhaseDetailComponent,
  ProjectComponent,
  StatusComponent,
  ResourceTypeComponent,
  RoleComponent,
  FixedPriceTypeComponent,
  FixedPriceTypeDetailComponent,
  RoleDetailComponent,
  StatusDetailComponent,
  ResourceTypeDetailComponent


} from '../configuration';

import { GroupComponent } from './group/group.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    SharedModule,
    ReactiveFormsModule,
    AppBootstrapModule,
   /*  BsDropdownModule,
    AlertModule,
    BsDatepickerModule, */
    ProjectDetailModule
  ],
  declarations: [
    RootComponent,
    PhaseListComponent,
    PhaseDetailComponent,
    ProjectComponent,
    StatusComponent,
    ResourceTypeComponent,
    RoleComponent,
    FixedPriceTypeComponent,
    FixedPriceTypeDetailComponent,
    RoleDetailComponent,
    StatusDetailComponent,
    ResourceTypeDetailComponent,
    GroupComponent
  ],
  providers: [
    PhaseService,
    FixedPriceTypeService,
    RoleService,
    StatusService,
    ResourceTypeService,
    GroupService,
    ProjectService]
})
export class ConfigurationModule { }
