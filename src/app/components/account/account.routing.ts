import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { AccountListComponent } from './account-list.component';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'accounts', component: AccountListComponent},
  { path: 'login', component: LoginFormComponent}
]);
