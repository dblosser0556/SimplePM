import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    RootComponent,
    PhaseListComponent,
    FixedPriceTypeComponent,
    RoleComponent,
    StatusComponent,
    ResourceTypeComponent,
    ProjectConfigComponent,
    AccountListComponent,
    GroupComponent
 } from '../configuration';

 import { ProjectComponent } from '../project/project.component';



    export const routing: ModuleWithProviders = RouterModule.forChild([
        {
          path: 'configuration',
          component: RootComponent,

          children: [
            { path: '', component: ProjectConfigComponent },
            { path: 'project', component: ProjectConfigComponent, data: {'title': 'Projects'} },
            { path: 'project-template', component: ProjectConfigComponent, data: {'title': 'Project Templates'} },
            { path: 'role', component: RoleComponent, data: {'title': 'Project Roles'} },
            { path: 'phase', component: PhaseListComponent, data: {'title': 'Phases'} },
            { path: 'fixedpricetype', component: FixedPriceTypeComponent, data: {'title': 'Fixed Price Types'} },
            { path: 'status', component: StatusComponent, data: {'title': 'Configure Project Status'} },
            { path: 'resourcetype', component: ResourceTypeComponent, data: {'title': 'Configure Resource Types'} },
            { path: 'accounts', component: AccountListComponent, data: {'title': 'Configure Users'} },
            { path: 'group', component: GroupComponent, data: {'title': 'Configure Project Groups'} },
            { path: 'project-details', component: ProjectComponent, data: {'title': 'Update Project Template'} },

          ]
        }
      ]);
