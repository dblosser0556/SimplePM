import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home'} }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
