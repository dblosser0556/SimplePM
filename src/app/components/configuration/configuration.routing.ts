import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    RootComponent,
    PhaseListComponent,
    FixedPriceTypeComponent,
    RoleComponent,
    StatusComponent,
    ResourceTypeComponent,
    ProjectComponent,
    AccountListComponent
 } from '../configuration';



    export const routing: ModuleWithProviders = RouterModule.forChild([
        {
          path: 'configuration',
          component: RootComponent,

          children: [
            { path: '', component: ProjectComponent },
            { path: 'project', component: ProjectComponent, data: {'title': 'Projects'} },
            { path: 'role', component: RoleComponent, data: {'title': 'Project Roles'} },
            { path: 'phase', component: PhaseListComponent, data: {'title': 'Phases'} },
            { path: 'fixedpricetype', component: FixedPriceTypeComponent, data: {'title': 'Fixed Price Types'} },
            { path: 'status', component: StatusComponent, data: {'title': 'Status'} },
            { path: 'resourcetype', component: ResourceTypeComponent, data: {'title': 'Resource Types'} },
            { path: 'accounts', component: AccountListComponent, data: {'title': 'Configure Users'}},
         

          ]
        }
      ]);
