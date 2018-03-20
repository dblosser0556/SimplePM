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
          component: RootComponent, data: {'title': 'root', 'breadcrumb': 'Configuration'},

          children: [
            { path: '', component: ProjectConfigComponent, data: {'title': 'Projects', 'breadcrumb': 'Projects'}  },
            { path: 'projects', data: {'title': 'Projects', 'breadcrumb': 'Projects'},
              children: [
                {path: '', component: ProjectConfigComponent, data: {'title': 'Projects', 'breadcrumb': 'Projects'}},
                {path: 'project', component: ProjectComponent, data: {'title': 'Update Project', 'breadcrumb': 'Details'}}
              ]},
            { path: 'project-templates', data: {'title': 'Project Templates', 'breadcrumb': 'Templates'},
              children: [
                {path: '', component: ProjectConfigComponent, data: {'title': 'Project Templates', 'breadcrumb': 'Templates'}},
                {path: 'template', component: ProjectComponent, data: {'title': 'Update Template', 'breadcrumb': 'Template'}}
              ] },
            { path: 'role', component: RoleComponent, data: {'title': 'Project Roles', 'breadcrumb': 'Roles'} },
            { path: 'phase', component: PhaseListComponent, data: {'title': 'Phases', 'breadcrumb': 'Phase'} },
            { path: 'fixedpricetype', component: FixedPriceTypeComponent, data: {'title': 'Fixed Price Types'} },
            { path: 'status', component: StatusComponent, data: {'title': 'Configure Project Status', 'breadcrumb': 'Status'} },
            { path: 'resourcetype', component: ResourceTypeComponent, data: {'title': 'Configure Resource Types', 'breadcrumb': 'Types'} },
            { path: 'accounts', component: AccountListComponent, data: {'title': 'Configure Users', 'breadcrumb': 'Users'} },
            { path: 'group', component: GroupComponent, data: {'title': 'Configure Project Groups', 'breadcrumb': 'Groups'} },

          ]
        }
      ]);
