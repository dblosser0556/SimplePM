import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { UserService } from '../../services';

import { EmailValidator } from '../../directives/email.validator.directive';

import { routing } from './account.routing';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';



@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, routing, SharedModule
  ],
  declarations: [RegistrationFormComponent, EmailValidator, LoginFormComponent],
  providers:    [ UserService ]
})
export class AccountModule { }
