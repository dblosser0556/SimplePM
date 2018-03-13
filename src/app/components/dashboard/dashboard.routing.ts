import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from '../project/project.component';
import { RootComponent } from './root/root.component';
import { AuthGuard } from '../../guard/auth.guard';


export const routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'dashboard',
    component: RootComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'divisions', component: DivisionsComponent },
      { path: 'programs', component: ProgramsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'project', component: ProjectComponent },
    ]
  }
]);
